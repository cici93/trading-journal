import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/overview' },
  { path: 'overview', loadComponent: () => import('./pages/overview/overview.component').then(m => m.OverviewComponent) }
];
