import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./auth/login').then(m => m.Login)
  },
  {
    path: '',
    loadComponent: () => import('./layout/layout').then(m => m.Layout),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard)
      },
      {
        path: 'customers',
        loadComponent: () => import('./customers/list').then(m => m.CustomerList)
      },
      {
        path: 'customers/new',
        loadComponent: () => import('./customers/form').then(m => m.CustomerForm)
      },
      {
        path: 'customers/:id/edit',
        loadComponent: () => import('./customers/form').then(m => m.CustomerForm)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
