// Supabase Edge Function: submit-tour
// Securely inserts tour requests using the service role key (kept on the server).
// CORS enabled for the site origin; update ALLOWED_ORIGIN env if needed.

// deno-lint-ignore-file no-explicit-any
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SERVICE_ROLE_KEY")!;
const HCAPTCHA_SECRET = Deno.env.get("HCAPTCHA_SECRET");
const ALLOWED_ORIGIN = Deno.env.get("ALLOWED_ORIGIN") || "*";
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const EMAIL_FROM = Deno.env.get("EMAIL_FROM");
const NOTIFY_EMAILS = Deno.env.get("NOTIFY_EMAILS"); // comma-separated
const SLACK_WEBHOOK_URL = Deno.env.get("SLACK_WEBHOOK_URL");
const GMAIL_CLIENT_ID = Deno.env.get("GMAIL_CLIENT_ID");
const GMAIL_CLIENT_SECRET = Deno.env.get("GMAIL_CLIENT_SECRET");
const GMAIL_REFRESH_TOKEN = Deno.env.get("GMAIL_REFRESH_TOKEN");

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "content-type, authorization, x-client-info, apikey",
  } as Record<string, string>;
}

type NotifyResult = { gmail?: boolean; resend?: boolean; slack?: boolean };

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
        const to = NOTIFY_EMAILS.split(",").map((s) => s.trim()).filter(Boolean).join(", ");
        const rfc822 = [
          `From: \"A Place Called Home\" <${EMAIL_FROM}>`,
          `To: ${to}`,
          `Subject: ${subject}`,
          `Content-Type: text/plain; charset=\"UTF-8\"`,
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
          to: NOTIFY_EMAILS.split(",").map((s) => s.trim()).filter(Boolean),
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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders() });
  }

  try {
    const body = await req.json();

    // hCaptcha verification (if configured)
    if (HCAPTCHA_SECRET) {
      const token = body?.captchaToken as string | undefined;
      if (!token) {
        return new Response(JSON.stringify({ error: "Missing captcha token" }), {
          status: 400,
          headers: { "content-type": "application/json", ...corsHeaders() },
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
          headers: { "content-type": "application/json", ...corsHeaders() },
        });
      }
    }

    // Basic input validation (minimal; extend as needed)
    const required = ["firstName", "lastName", "email", "phone"] as const;
    for (const key of required) {
      if (!body?.[key]) {
        return new Response(JSON.stringify({ error: `Missing ${key}` }), {
          status: 400,
          headers: { "content-type": "application/json", ...corsHeaders() },
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
    const { error } = await supabase.from("tours").insert(insertPayload);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "content-type": "application/json", ...corsHeaders() },
      });
    }

    const text = `New tour request\n\nName: ${insertPayload.first_name} ${insertPayload.last_name}\nEmail: ${insertPayload.email}\nPhone: ${insertPayload.phone}\nType: ${insertPayload.tour_type ?? "(n/a)"}\nLocation: ${insertPayload.location ?? "(n/a)"}\nDate: ${insertPayload.preferred_date ?? "(n/a)"} ${insertPayload.preferred_time ?? ""}`;
    const debug = new URL(req.url).searchParams.get("debug") === "1";
    let notify: NotifyResult | undefined;
    if (debug) {
      notify = await sendNotifications("New Tour Request", text);
    } else {
      // fire and forget
      sendNotifications("New Tour Request", text);
    }
    const env = debug
      ? {
          gmailReady: !!(GMAIL_CLIENT_ID && GMAIL_CLIENT_SECRET && GMAIL_REFRESH_TOKEN && EMAIL_FROM && NOTIFY_EMAILS),
          resendReady: !!(RESEND_API_KEY && EMAIL_FROM && NOTIFY_EMAILS),
          slackReady: !!SLACK_WEBHOOK_URL,
        }
      : undefined;

    return new Response(JSON.stringify({ ok: true, ...(debug ? { notify, env } : {}) }), {
      status: 200,
      headers: { "content-type": "application/json", ...corsHeaders() },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e?.message || "Invalid request" }), {
      status: 400,
      headers: { "content-type": "application/json", ...corsHeaders() },
    });
  }
});
