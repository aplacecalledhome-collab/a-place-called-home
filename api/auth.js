export default function handler(req, res) {
  // Check if basic auth is configured
  const user = process.env.BASIC_AUTH_USER || '';
  const pass = process.env.BASIC_AUTH_PASS || '';

  if (!user || !pass) {
    // Instead of crashing, return a helpful message
    return res.status(200).json({
      message: 'Basic authentication not configured',
      instructions: 'Set BASIC_AUTH_USER and BASIC_AUTH_PASS environment variables in Vercel to enable authentication',
      status: 'disabled'
    });
  }

  // If auth is configured, proceed with authentication logic
  const authHeader = req.headers.authorization || '';
  const [scheme, encoded] = authHeader.split(' ');
  
  if (scheme !== 'Basic' || !encoded) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Protected", charset="UTF-8"');
    return res.status(401).json({
      message: 'Authentication required',
      status: 'unauthorized'
    });
  }

  let credentials = '';
  try {
    credentials = Buffer.from(encoded, 'base64').toString('utf8');
  } catch {
    return res.status(400).json({
      message: 'Invalid authorization header format',
      status: 'error'
    });
  }

  const sepIndex = credentials.indexOf(':');
  if (sepIndex === -1) {
    return res.status(400).json({
      message: 'Invalid credentials format',
      status: 'error'
    });
  }

  const providedUser = credentials.slice(0, sepIndex);
  const providedPass = credentials.slice(sepIndex + 1);

  if (providedUser !== user || providedPass !== pass) {
    return res.status(401).json({
      message: 'Invalid credentials',
      status: 'unauthorized'
    });
  }

  // Authentication successful
  const redirectParam = Array.isArray(req.query.redirect)
    ? req.query.redirect[0]
    : (req.query.redirect || '/');

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
