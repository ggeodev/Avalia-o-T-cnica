import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CustomerState } from './state';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-customer-form',
  imports: [ReactiveFormsModule, RouterLink, MatIconModule],
  template: `
    <div class="max-w-3xl mx-auto space-y-6">
      <div class="flex items-center space-x-4">
        <a routerLink="/customers" class="p-2 -ml-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-100">
          <mat-icon>arrow_back</mat-icon>
        </a>
        <h1 class="text-xl font-bold text-slate-800">{{ isEditing ? 'Editar Cliente' : 'Novo Cliente' }}</h1>
      </div>

      <div class="bg-white border border-slate-200 rounded-xl shadow-sm p-8">
        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-6">
          <div class="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2">
            <div class="sm:col-span-2">
              <label for="name" class="block text-sm font-bold text-slate-500 uppercase">Nome Completo</label>
              <div class="mt-2 relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <mat-icon class="text-slate-400" style="font-size: 20px; width: 20px; height: 20px;">person_outline</mat-icon>
                </div>
                <input type="text" id="name" formControlName="name" class="focus:ring-2 focus:ring-blue-500 focus:outline-none block w-full pl-10 sm:text-sm border-slate-200 rounded-md border px-3 py-2 text-slate-800 transition-colors">
              </div>
            </div>

            <div class="sm:col-span-1">
              <label for="email" class="block text-sm font-bold text-slate-500 uppercase">E-mail</label>
              <div class="mt-2 relative">
                 <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <mat-icon class="text-slate-400" style="font-size: 20px; width: 20px; height: 20px;">mail_outline</mat-icon>
                </div>
                <input type="email" id="email" formControlName="email" class="focus:ring-2 focus:ring-blue-500 focus:outline-none block w-full pl-10 sm:text-sm border-slate-200 rounded-md border px-3 py-2 text-slate-800 transition-colors">
              </div>
            </div>

            <div class="sm:col-span-1">
              <label for="phone" class="block text-sm font-bold text-slate-500 uppercase">Telefone</label>
              <div class="mt-2 relative">
                 <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <mat-icon class="text-slate-400" style="font-size: 20px; width: 20px; height: 20px;">phone</mat-icon>
                </div>
                <input type="text" id="phone" formControlName="phone" placeholder="(00) 00000-0000" class="focus:ring-2 focus:ring-blue-500 focus:outline-none block w-full pl-10 sm:text-sm border-slate-200 rounded-md border px-3 py-2 text-slate-800 transition-colors">
              </div>
            </div>

            <div class="sm:col-span-2">
              <label for="status" class="block text-sm font-bold text-slate-500 uppercase">Status</label>
              <div class="mt-2 relative">
                 <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <mat-icon class="text-slate-400" style="font-size: 20px; width: 20px; height: 20px;">info_outline</mat-icon>
                </div>
                <select id="status" formControlName="status" class="focus:ring-2 focus:ring-blue-500 focus:outline-none block w-full pl-10 sm:text-sm border-slate-200 rounded-md border px-3 py-2 bg-white text-slate-800 transition-colors">
                  <option value="active">Ativo</option>
                  <option value="inactive">Inativo</option>
                </select>
              </div>
            </div>
          </div>

          <div class="flex justify-end space-x-3 pt-6 border-t border-slate-100">
            <a routerLink="/customers" class="inline-flex justify-center px-4 py-2 border border-slate-200 text-sm font-semibold rounded-md text-slate-600 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 transition-colors">
              Cancelar
            </a>
            <button type="submit" [disabled]="form.invalid" class="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors inline-flex items-center disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class CustomerForm implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private state = inject(CustomerState);

  isEditing = false;
  customerId: string | null = null;

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    status: ['active', Validators.required]
  });

  ngOnInit() {
    this.customerId = this.route.snapshot.paramMap.get('id');
    if (this.customerId) {
      this.isEditing = true;
      const customer = this.state.getById(this.customerId);
      if (customer) {
        this.form.patchValue(customer);
      } else {
        this.router.navigate(['/customers']);
      }
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const value = this.form.value as import('./types').Customer;
      if (this.isEditing && this.customerId) {
        this.state.update(this.customerId, value);
      } else {
        this.state.add(value);
      }
      this.router.navigate(['/customers']);
    }
  }
}
