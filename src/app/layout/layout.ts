import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { Auth } from '../auth/auth';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatIconModule],
  template: `
    <div class="flex h-screen w-full bg-slate-50 font-sans text-slate-900 overflow-hidden">
      <!-- Sidebar -->
      <aside class="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div class="p-6 border-b border-slate-100">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">C</div>
            <span class="font-bold text-xl tracking-tight text-slate-800">CRM PRO</span>
          </div>
        </div>
        <div class="flex-1 overflow-y-auto">
          <nav class="p-4 space-y-2">
            <a routerLink="/" routerLinkActive="bg-blue-50 text-blue-700" [routerLinkActiveOptions]="{exact: true}"
              class="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-lg font-medium transition-colors">
              <mat-icon [class.text-blue-700]="router.url === '/'">dashboard</mat-icon>
              Dashboard
            </a>
            <a routerLink="/customers" routerLinkActive="bg-blue-50 text-blue-700"
              class="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-lg font-medium transition-colors">
              <mat-icon [class.text-blue-700]="router.url.includes('/customers')">people</mat-icon>
              Clientes
            </a>
          </nav>
        </div>
        <div class="p-4 border-t border-slate-100">
          <button (click)="logout()" class="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors">
            <mat-icon>logout</mat-icon>
            Sair
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 flex flex-col overflow-hidden">
        <div class="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-8">
          <div class="max-w-6xl mx-auto space-y-6">
            <router-outlet></router-outlet>
          </div>
        </div>
      </main>
    </div>
  `
})
export class Layout {
  private auth = inject(Auth);
  router = inject(Router);

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
