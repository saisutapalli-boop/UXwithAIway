import { Routes } from '@angular/router';

export const WIKI_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./wiki-list.component').then(m => m.WikiListComponent) },
  { path: ':slug', loadComponent: () => import('./wiki-detail.component').then(m => m.WikiDetailComponent) },
];
