import * as admin from 'firebase-admin';
import { onRequest } from 'firebase-functions/v2/https';
import { generateCsrfToken, validateCsrfToken } from './middleware/csrf';
import { apiRateLimiter } from './middleware/rate-limiter';

admin.initializeApp();

// Re-export auth triggers
export { onUserCreate } from './auth/on-user-create';

// CSRF token endpoint
export const csrfToken = onRequest({ cors: true }, (req, res) => {
  apiRateLimiter(req, res, () => {
    if (req.method === 'GET') {
      generateCsrfToken(req, res);
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  });
});

// Example protected API endpoint (for future Strategy Builder v2)
export const api = onRequest({ cors: true }, (req, res) => {
  apiRateLimiter(req, res, () => {
    validateCsrfToken(req, res, () => {
      // Verify Firebase ID token
      const authHeader = req.headers.authorization;
      if (!authHeader?.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const idToken = authHeader.split('Bearer ')[1];
      admin
        .auth()
        .verifyIdToken(idToken)
        .then((decoded) => {
          res.json({
            message: 'Authenticated',
            uid: decoded.uid,
            role: decoded.role || 'viewer',
          });
        })
        .catch(() => {
          res.status(401).json({ error: 'Invalid token' });
        });
    });
  });
});
