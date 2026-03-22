import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'strategy-builder',
    loadComponent: () => import('./features/strategy-builder/strategy-builder.component').then(m => m.StrategyBuilderComponent),
  },
  {
    path: 'wiki',
    loadChildren: () => import('./features/wiki/wiki.routes').then(m => m.WIKI_ROUTES),
  },
  {
    path: 'tools',
    loadChildren: () => import('./features/tools/tools.routes').then(m => m.TOOLS_ROUTES),
  },
  {
    path: 'glossary',
    loadComponent: () => import('./features/glossary/glossary.component').then(m => m.GlossaryComponent),
  },
  {
    path: 'contributor-hub',
    loadComponent: () => import('./features/contributor-hub/contributor-hub.component').then(m => m.ContributorHubComponent),
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent),
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
