// Supabase Edge Function: submit-tour
// Securely inserts tour requests using the service role key (kept on the server).
// CORS enabled for the site origin; update ALLOWED_ORIGIN env if needed.

// deno-lint-ignore-file no-explicit-any
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { load as loadEnv } from "https://deno.land/std@0.224.0/dotenv/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Helpful when running via `deno run` locally: load .env next to this file
try {
  await loadEnv({ envPath: new URL('./.env', import.meta.url), export: true });
} catch {
  // ignore if not present; Supabase CLI/Edge Functions provide envs
}

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SERVICE_ROLE_KEY");
const HCAPTCHA_SECRET = Deno.env.get("HCAPTCHA_SECRET");
const ALLOWED_ORIGIN = Deno.env.get("ALLOWED_ORIGIN") || "*";
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const EMAIL_FROM = Deno.env.get("EMAIL_FROM");
const EMAIL_REPLY_TO = Deno.env.get("EMAIL_REPLY_TO");
const NOTIFY_EMAILS = Deno.env.get("NOTIFY_EMAILS"); // comma-separated
const SLACK_WEBHOOK_URL = Deno.env.get("SLACK_WEBHOOK_URL");
const GMAIL_CLIENT_ID = Deno.env.get("GMAIL_CLIENT_ID");
const GMAIL_CLIENT_SECRET = Deno.env.get("GMAIL_CLIENT_SECRET");
const GMAIL_REFRESH_TOKEN = Deno.env.get("GMAIL_REFRESH_TOKEN");
const ALWAYS_BCC_LIST = (Deno.env.get("ALWAYS_BCC") || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Missing SUPABASE_URL or SERVICE_ROLE_KEY in environment. Provide them via Supabase secrets or a local .env.");
}
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

function resolveAllowedOrigin(requestOrigin?: string) {
  if (ALLOWED_ORIGIN === "*") return "*";
  const list = ALLOWED_ORIGIN.split(",").map((s) => s.trim()).filter(Boolean);
  if (list.length <= 1) return list[0] || ALLOWED_ORIGIN;
  if (requestOrigin && list.includes(requestOrigin)) return requestOrigin;
  return list[0];
}

function corsHeaders(requestOrigin?: string) {
  return {
    "Access-Control-Allow-Origin": resolveAllowedOrigin(requestOrigin),
    "Vary": "Origin",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "content-type, authorization, x-client-info, apikey",
  } as Record<string, string>;
}

type NotifyResult = { gmail?: boolean; resend?: boolean; slack?: boolean };

function encodeHeader(value: string): string {
  try {
    const b64 = btoa(unescape(encodeURIComponent(value)));
    return `=?UTF-8?B?${b64}?=`;
  } catch {
    return value;
  }
}

async function sendNotifications(subject: string, text: string): Promise<NotifyResult> {
  const result: NotifyResult = {};
  // Gmail API (preferred if configured)
  if (GMAIL_CLIENT_ID && GMAIL_CLIENT_SECRET && GMAIL_REFRESH_TOKEN && EMAIL_FROM && NOTIFY_EMAILS) {
    try {
      const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: GMAIL_CLIENT_ID,
          client_secret: GMAIL_CLIENT_SECRET,
          refresh_token: GMAIL_REFRESH_TOKEN,
          grant_type: "refresh_token",
        }),
      });
      const tokenJson = await tokenRes.json();
      const accessToken = tokenJson.access_token as string | undefined;
      if (accessToken) {
        const bccSet = new Set<string>(NOTIFY_EMAILS.split(",").map((s) => s.trim()).filter(Boolean));
        for (const addr of ALWAYS_BCC_LIST) bccSet.add(addr);
        const bccList = Array.from(bccSet);
        const rfc822 = [
          `From: \"A Place Called Home\" <${EMAIL_FROM}>`,
          `To: ${EMAIL_FROM}`,
          ...(bccList.length ? [`Bcc: ${bccList.join(", ")}`] : []),
          `Subject: ${encodeHeader(subject)}`,
          `MIME-Version: 1.0`,
          `Content-Type: text/plain; charset=\"UTF-8\"`,
          `Content-Transfer-Encoding: 8bit`,
          "",
          text,
        ].join("\r\n");
        const raw = btoa(unescape(encodeURIComponent(rfc822)))
          .replace(/\+/g, "-")
          .replace(/\//g, "_")
          .replace(/=+$/, "");
        const sendRes = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ raw }),
        });
        result.gmail = sendRes.ok;
      } else {
        result.gmail = false;
      }
    } catch (_) {
      // swallow
      result.gmail = false;
    }
  }
  // Email via Resend
  if (RESEND_API_KEY && EMAIL_FROM && NOTIFY_EMAILS) {
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: EMAIL_FROM,
          to: [EMAIL_FROM],
          bcc: [
            ...NOTIFY_EMAILS.split(",").map((s) => s.trim()).filter(Boolean),
            ...ALWAYS_BCC_LIST,
          ],
          subject,
          text,
        }),
      });
      result.resend = r.ok;
    } catch (_) {
      // swallow
      result.resend = false;
    }
  }
  // Slack webhook
  if (SLACK_WEBHOOK_URL) {
    try {
      const r = await fetch(SLACK_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: `🟢 ${subject}\n${text}` }),
      });
      result.slack = r.ok;
    } catch (_) {
      // swallow
      result.slack = false;
    }
  }
  return result;
}

async function sendConfirmationEmail(toEmail: string, subject: string, text: string): Promise<Omit<NotifyResult, 'slack'>> {
  const result: Omit<NotifyResult, 'slack'> = {};
  // Gmail (preferred)
  if (GMAIL_CLIENT_ID && GMAIL_CLIENT_SECRET && GMAIL_REFRESH_TOKEN && EMAIL_FROM) {
    try {
      const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: GMAIL_CLIENT_ID,
          client_secret: GMAIL_CLIENT_SECRET,
          refresh_token: GMAIL_REFRESH_TOKEN,
          grant_type: "refresh_token",
        }),
      });
      const tokenJson = await tokenRes.json();
      const accessToken = tokenJson.access_token as string | undefined;
      if (accessToken) {
        const rfc822 = [
          `From: \"A Place Called Home\" <${EMAIL_FROM}>`,
          `To: ${toEmail}`,
          `Subject: ${encodeHeader(subject)}`,
          // Intentionally omit Reply-To per request
          ...(ALWAYS_BCC_LIST.length ? [`Bcc: ${ALWAYS_BCC_LIST.join(", ")}`] : []),
          `MIME-Version: 1.0`,
          `Content-Type: text/plain; charset=\"UTF-8\"`,
          `Content-Transfer-Encoding: 8bit`,
          "",
          text,
        ].join("\r\n");
        const raw = btoa(unescape(encodeURIComponent(rfc822)))
          .replace(/\+/g, "-")
          .replace(/\//g, "_")
          .replace(/=+$/, "");
        const sendRes = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ raw }),
        });
        result.gmail = sendRes.ok;
      } else {
        result.gmail = false;
      }
    } catch (_) {
      result.gmail = false;
    }
  }
  if (RESEND_API_KEY && EMAIL_FROM) {
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: EMAIL_FROM,
          to: [toEmail],
          ...(ALWAYS_BCC_LIST.length ? { bcc: ALWAYS_BCC_LIST } : {}),
          subject,
          text,
          // No reply_to per request
        }),
      });
      result.resend = r.ok;
    } catch (_) {
      result.resend = false;
    }
  }
  return result;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    const origin = req.headers.get("origin") || undefined;
    return new Response("ok", { headers: corsHeaders(origin) });
  }

  try {
    const body = await req.json();
    const url = new URL(req.url);
    const debug = url.searchParams.get("debug") === "1";
    const origin = req.headers.get("origin") || "";
    const host = req.headers.get("host") || url.host;
    const xForwardedHost = req.headers.get("x-forwarded-host") || "";
    const isLocalOrigin = /^https?:\/\/(localhost|127\.0\.0\.1)(:\\d+)?$/.test(origin);
    const isLocalHostHeader = /^(localhost|127\.0\.0\.1)(:\\d+)?$/.test(host);
    const isLocalForwarded = /localhost|127\.0\.0\.1/.test(xForwardedHost);
    const isLocalRequest = isLocalOrigin || isLocalHostHeader || isLocalForwarded || url.hostname === 'localhost' || url.hostname === '127.0.0.1';

    // hCaptcha verification (if configured)
    if (HCAPTCHA_SECRET && !isLocalRequest && !debug) {
      const token = body?.captchaToken as string | undefined;
      if (!token) {
        return new Response(JSON.stringify({ error: "Missing captcha token" }), {
          status: 400,
          headers: { "content-type": "application/json", ...corsHeaders(origin) },
        });
      }
      const verifyRes = await fetch("https://hcaptcha.com/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret: HCAPTCHA_SECRET, response: token }),
      });
      const verifyJson = await verifyRes.json();
      if (!verifyJson.success) {
        return new Response(JSON.stringify({ error: "Captcha verification failed" }), {
          status: 400,
          headers: { "content-type": "application/json", ...corsHeaders(origin) },
        });
      }
    }

    // Honeypot field (hidden on UI). Bots often fill everything.
    if (body?.website) {
      return new Response(JSON.stringify({ error: "Spam detected" }), {
        status: 400,
        headers: { "content-type": "application/json", ...corsHeaders(origin) },
      });
    }

    // Basic input validation (minimal; extend as needed)
    const required = ["firstName", "lastName", "email", "phone"] as const;
    for (const key of required) {
      if (!body?.[key]) {
        return new Response(JSON.stringify({ error: `Missing ${key}` }), {
          status: 400,
          headers: { "content-type": "application/json", ...corsHeaders(origin) },
        });
      }
    }

    const insertPayload = {
      first_name: body.firstName,
      last_name: body.lastName,
      email: body.email,
      phone: body.phone,
      tour_type: body.tourType ?? null,
      location: body.location ?? null,
      preferred_date: body.preferredDate ?? null,
      preferred_time: body.preferredTime ?? null,
      relationship: body.relationship ?? null,
      current_situation: body.currentSituation ?? null,
      timeline: body.timeline ?? null,
      special_needs: body.specialNeeds ?? null,
      hear_about_us: body.hearAboutUs ?? null,
      marketing_consent: !!body.marketingConsent,
      raw: body,
    };
    console.log(insertPayload);
    const { error } = await supabase.from("tours").insert(insertPayload);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "content-type": "application/json", ...corsHeaders(origin) },
      });
    }

    // Build a detailed admin notification including the submitted fields
    const who = `${body.firstName || ''} ${body.lastName || ''}`.trim();
    // Use ASCII-only separator to avoid subject garbling across providers
    const adminSubject = `New Tour Request: ${who || 'Unknown'}${body.tourType ? ` - ${body.tourType}` : ''}`;
    const lines = [
      `A new tour request was received.`,
      "",
      `First Name:        ${body.firstName ?? ''}`,
      `Last Name:         ${body.lastName ?? ''}`,
      `Email:             ${body.email ?? ''}`,
      `Phone:             ${body.phone ?? ''}`,
      `Tour Type:         ${body.tourType ?? ''}`,
      `Location:          ${body.location ?? ''}`,
      `Preferred Date:    ${body.preferredDate ?? ''}`,
      `Preferred Time:    ${body.preferredTime ?? ''}`,
      `Relationship:      ${body.relationship ?? ''}`,
      `Current Situation: ${body.currentSituation ?? ''}`,
      `Timeline:          ${body.timeline ?? ''}`,
      `Special Needs:     ${body.specialNeeds ?? ''}`,
      `Heard About Us:    ${body.hearAboutUs ?? ''}`,
      `Marketing Consent: ${body.marketingConsent ? 'Yes' : 'No'}`,
      "",
      `Submitted At:      ${new Date().toISOString()}`,
    ];
    const text = lines.join("\n");

    // Send user confirmation
    const userSubject = "We received your tour request – A Place Called Home";
    const userText = `Hello ${who || 'there'},\n\nThank you for scheduling a tour with A Place Called Home. We will contact you shortly to confirm your appointment and answer any questions.\n\nIf you need to reach us sooner, please call (510) 939-0657.\n\n— A Place Called Home LLC`;
    // debug flag computed earlier
    let notify: NotifyResult | undefined;
    let confirm: Omit<NotifyResult, 'slack'> | undefined;
    if (debug) {
      notify = await sendNotifications(adminSubject, text);
      
      if (body.email) confirm = await sendConfirmationEmail(body.email, userSubject, userText);
    } else {
      // fire and forget
      sendNotifications(adminSubject, text);
      if (body.email) sendConfirmationEmail(body.email, userSubject, userText);
    }
    const env = debug
      ? {
          gmailReady: !!(GMAIL_CLIENT_ID && GMAIL_CLIENT_SECRET && GMAIL_REFRESH_TOKEN && EMAIL_FROM && NOTIFY_EMAILS),
          resendReady: !!(RESEND_API_KEY && EMAIL_FROM && NOTIFY_EMAILS),
          slackReady: !!SLACK_WEBHOOK_URL,
        }
      : undefined;

    return new Response(JSON.stringify({ ok: true, ...(debug ? { notify, confirm, env } : {}) }), {
      status: 200,
      headers: { "content-type": "application/json", ...corsHeaders(origin) },
    });
  } catch (e) {
    const origin = req.headers.get("origin") || undefined;
    return new Response(JSON.stringify({ error: e?.message || "Invalid request" }), {
      status: 400,
      headers: { "content-type": "application/json", ...corsHeaders(origin) },
    });
  }
});
