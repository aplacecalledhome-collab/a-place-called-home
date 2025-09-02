import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Check environment variables
    const envStatus = {
      NODE_ENV: process.env.NODE_ENV || 'not set',
      VERCEL_ENV: process.env.VERCEL_ENV || 'not set',
      VITE_SUPABASE_FUNCTIONS_URL: process.env.VITE_SUPABASE_FUNCTIONS_URL ? 'configured' : 'not set',
      BASIC_AUTH_USER: process.env.BASIC_AUTH_USER ? 'configured' : 'not set',
      BASIC_AUTH_PASS: process.env.BASIC_AUTH_PASS ? 'configured' : 'not set'
    };

    return res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: envStatus,
      message: 'A Place Called Home API is running successfully',
      version: '1.0.0'
    });
  } catch (error) {
    console.error('Health check error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Health check failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
