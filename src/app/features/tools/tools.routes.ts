import { Routes } from '@angular/router';

export const TOOLS_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./tools-list.component').then(m => m.ToolsListComponent) },
  { path: ':slug', loadComponent: () => import('./tool-detail.component').then(m => m.ToolDetailComponent) },
];
