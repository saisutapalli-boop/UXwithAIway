import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  { path: 'login', loadComponent: () => import('./login.component').then(m => m.LoginComponent) },
  { path: 'profile', loadComponent: () => import('./profile.component').then(m => m.ProfileComponent) },
];
