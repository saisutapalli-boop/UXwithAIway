import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth);
  const user = auth.currentUser;

  if (user && req.url.includes('/api/')) {
    return new Promise<any>((resolve) => {
      user.getIdToken().then(token => {
        const cloned = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });
        resolve(next(cloned));
      });
    }).then(obs => obs);
  }

  return next(req);
};
