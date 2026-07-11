import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomerState } from './state';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-customer-list',
  imports: [RouterLink, MatIconModule],
  template: `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h1 class="text-xl font-bold text-slate-800">Listagem de Clientes Recentes</h1>
        <a routerLink="/customers/new" class="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors inline-flex items-center">
          + Novo Cliente
        </a>
      </div>

      <div class="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col flex-1">
        <div class="flex-1 overflow-auto">
          <table class="w-full text-left">
            <thead class="bg-slate-50 sticky top-0">
              <tr>
                <th scope="col" class="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Nome</th>
                <th scope="col" class="px-6 py-3 text-xs font-bold text-slate-500 uppercase">E-mail</th>
                <th scope="col" class="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Telefone</th>
                <th scope="col" class="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Status</th>
                <th scope="col" class="px-6 py-3 text-xs font-bold text-slate-500 uppercase text-right">Ações</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              @for (customer of state.all(); track customer.id) {
                <tr class="hover:bg-slate-50">
                  <td class="px-6 py-4 font-medium text-slate-800">{{ customer.name }}</td>
                  <td class="px-6 py-4 text-slate-500 text-sm">{{ customer.email }}</td>
                  <td class="px-6 py-4 text-slate-500 text-sm">{{ customer.phone }}</td>
                  <td class="px-6 py-4">
                    <span class="px-2 py-1 text-xs font-bold rounded-full" 
                          [class]="customer.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'">
                      {{ customer.status === 'active' ? 'Ativo' : 'Inativo' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-right space-x-2">
                    <a [routerLink]="['/customers', customer.id, 'edit']" class="text-slate-400 hover:text-blue-600 inline-flex items-center" title="Editar">
                      <mat-icon style="font-size: 20px; width: 20px; height: 20px;">edit</mat-icon>
                    </a>
                    <button (click)="remove(customer.id)" class="text-slate-400 hover:text-red-600 inline-flex items-center transition-colors" title="Excluir">
                      <mat-icon style="font-size: 20px; width: 20px; height: 20px;">delete_outline</mat-icon>
                    </button>
                  </td>
                </tr>
              }
              @if (state.all().length === 0) {
                <tr>
                  <td colspan="5" class="px-6 py-12 text-center text-sm text-slate-500">
                    Nenhum cliente cadastrado.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class CustomerList {
  state = inject(CustomerState);

  remove(id: string) {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      this.state.remove(id);
    }
  }
}
