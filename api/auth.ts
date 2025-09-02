import type { VercelRequest, VercelResponse } from '@vercel/node';

function unauthorized(res: VercelResponse) {
  res.setHeader('WWW-Authenticate', 'Basic realm="Protected", charset="UTF-8"');
  return res.status(401).send('Authentication required');
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  const user = process.env.BASIC_AUTH_USER || '';
  const pass = process.env.BASIC_AUTH_PASS || '';

  if (!user || !pass) {
    return res
      .status(500)
      .send('Basic auth not configured. Set BASIC_AUTH_USER and BASIC_AUTH_PASS env vars.');
  }

  const authHeader = req.headers.authorization || '';
  const [scheme, encoded] = authHeader.split(' ');
  if (scheme !== 'Basic' || !encoded) {
    return unauthorized(res);
  }

  let credentials = '';
  try {
    credentials = Buffer.from(encoded, 'base64').toString('utf8');
  } catch {
    return unauthorized(res);
  }

  const sepIndex = credentials.indexOf(':');
  const providedUser = credentials.slice(0, sepIndex);
  const providedPass = credentials.slice(sepIndex + 1);

  if (providedUser !== user || providedPass !== pass) {
    return unauthorized(res);
  }

  const redirectParam = Array.isArray(req.query.redirect)
    ? req.query.redirect[0]
    : (req.query.redirect as string) || '/';

  // Prevent open redirects; only allow same-origin paths
  const redirectPath = redirectParam.startsWith('/') ? redirectParam : '/';

  // Set a short-lived cookie to avoid re-prompting for every asset
  const cookie = [
    'site_auth=1',
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    // 30 days
    'Max-Age=2592000',
    'Secure',
  ].join('; ');
  res.setHeader('Set-Cookie', cookie);

  return res.redirect(302, redirectPath);
}

