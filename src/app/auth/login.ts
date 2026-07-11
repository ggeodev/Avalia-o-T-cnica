import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from './auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  template: `
    <div class="flex h-screen w-full bg-slate-50 font-sans text-slate-900 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full bg-white p-10 rounded-xl border border-slate-200 shadow-sm">
        <div class="flex items-center justify-center gap-2 mb-8">
          <div class="w-10 h-10 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xl">C</div>
          <span class="font-bold text-2xl tracking-tight text-slate-800">CRM PRO</span>
        </div>
        <div>
          <h2 class="text-center text-xl font-bold text-slate-800">
            Acesso ao Sistema
          </h2>
        </div>
        <form class="mt-8 space-y-6" [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          @if (error()) {
            <div class="text-red-600 text-sm font-medium text-center bg-red-50 p-3 rounded-lg">
              {{ error() }}
            </div>
          }
          <div class="space-y-4">
            <div>
              <label for="email-address" class="block text-sm font-bold text-slate-500 uppercase mb-2">E-mail</label>
              <input id="email-address" type="email" formControlName="email" required
                class="focus:ring-2 focus:ring-blue-500 focus:outline-none block w-full sm:text-sm border-slate-200 rounded-md border px-3 py-2 text-slate-800 transition-colors"
                placeholder="E-mail corporativo">
            </div>
            <div>
              <label for="password" class="block text-sm font-bold text-slate-500 uppercase mb-2">Senha</label>
              <input id="password" type="password" formControlName="password" required
                class="focus:ring-2 focus:ring-blue-500 focus:outline-none block w-full sm:text-sm border-slate-200 rounded-md border px-3 py-2 text-slate-800 transition-colors"
                placeholder="Senha">
            </div>
          </div>

          <div class="pt-2">
            <button type="submit" [disabled]="loginForm.invalid"
              class="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class Login {
  private fb = inject(FormBuilder);
  private auth = inject(Auth);
  private router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  error = signal('');

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      if (this.auth.login(email!, password!)) {
        this.router.navigate(['/']);
      } else {
        this.error.set('Credenciais inválidas');
      }
    }
  }
}
