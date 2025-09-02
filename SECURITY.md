## Security Policy

We take security and privacy seriously. This document explains how to report issues, how we handle secrets, and how to avoid committing sensitive data.

### Report a Vulnerability
- Email: support@apchllc.com
- Please include clear reproduction steps, impact, and any proof‑of‑concept. Do not publicly disclose until we’ve confirmed and fixed the issue.

### Secrets Management (Do/Don’t)
- Do put development secrets in local, ignored files: `.env`, `.env.local`, and `supabase/functions/**/.env`.
- Don’t commit real secrets or tokens. Only commit `*.env.example` with placeholders.
- Production secrets live in your hosting/Supabase environment (Project → Settings → Environment/Secrets).

### What’s Ignored by Git
- `.env`, `.env.local`, `.env.*` (except examples)
- `supabase/functions/**/.env`
- Build artifacts, logs, and PID files

### Pre‑commit Secret Scan
We ship a lightweight secret scanner and a pre‑commit hook.

Install hook:

```
npm run hooks:install
```

Run a manual scan:

```
npm run scan:secrets
```

The scan blocks commits if high‑risk patterns are found (JWT‑looking strings, Supabase keys, OAuth secrets, PATs, etc.). You can extend patterns in `scripts/scan-secrets.sh`.

### Dependency & Supply Chain
- Use `npm ci` in CI for deterministic installs.
- Keep `@vitejs/*`, `react`, `typescript` and email/edge‑function deps up‑to‑date.
- Avoid adding new prod deps without review.

### Web Security
- CSP is dynamically applied in `useSEO.ts`. Keep allowed `connect-src` minimal in production (only your domains).
- Avoid inline scripts/styles where possible.

### Rotating Credentials
If a secret is exposed or suspected compromised:
1) Rotate it in the provider (Supabase, Gmail, Resend, etc.).
2) Update the project/edge function secrets in the dashboard.
3) Invalidate previous tokens.
4) Re‑deploy edge functions.

### Responsible Disclosure
We follow a standard 90‑day disclosure window unless mutually agreed otherwise.

