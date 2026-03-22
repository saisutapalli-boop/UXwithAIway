import * as crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';

const tokenStore = new Map<string, { token: string; expires: number }>();

// Clean up expired tokens every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of tokenStore.entries()) {
    if (now > entry.expires) {
      tokenStore.delete(key);
    }
  }
}, 10 * 60 * 1000);

export function generateCsrfToken(req: Request, res: Response): void {
  const token = crypto.randomBytes(32).toString('hex');
  const sessionId = req.ip || 'unknown';

  tokenStore.set(sessionId, {
    token,
    expires: Date.now() + 60 * 60 * 1000, // 1 hour
  });

  res.cookie('XSRF-TOKEN', token, {
    httpOnly: false, // Must be readable by client JS
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 1000,
  });

  res.json({ csrfToken: token });
}

export function validateCsrfToken(req: Request, res: Response, next: NextFunction): void {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }

  const headerToken = req.headers['x-xsrf-token'] as string;
  const sessionId = req.ip || 'unknown';
  const stored = tokenStore.get(sessionId);

  if (!headerToken || !stored || stored.token !== headerToken || Date.now() > stored.expires) {
    res.status(403).json({ error: 'Invalid or missing CSRF token' });
    return;
  }

  next();
}
