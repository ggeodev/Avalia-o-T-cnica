import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  imports: [MatIconModule],
  template: `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-bold text-slate-800">Dashboard Overview</h1>
      </div>
      
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <!-- Card 1 -->
        <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p class="text-sm font-medium text-slate-500 mb-1">Total de Clientes</p>
          <h2 class="text-3xl font-bold text-slate-900">1,240</h2>
          <div class="mt-2 flex items-center text-green-600 text-sm">
            <mat-icon style="font-size: 16px; width: 16px; height: 16px;" class="mr-1">trending_up</mat-icon>
            12% vs mês anterior
          </div>
        </div>

        <!-- Card 2 -->
        <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p class="text-sm font-medium text-slate-500 mb-1">Clientes Ativos</p>
          <h2 class="text-3xl font-bold text-slate-900">1,105</h2>
          <div class="mt-2 flex items-center text-blue-600 text-sm">
             <div class="w-full bg-slate-100 rounded-full h-1.5">
              <div class="bg-blue-600 h-1.5 rounded-full" style="width: 78.6%"></div>
            </div>
            <span class="ml-3">78.6%</span>
          </div>
        </div>

        <!-- Card 3 -->
        <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p class="text-sm font-medium text-slate-500 mb-1">Novos no Mês</p>
          <h2 class="text-3xl font-bold text-slate-900">42</h2>
           <div class="mt-2 flex items-center text-slate-600 text-sm">
            Meta: 60/mês
          </div>
        </div>
      </div>
    </div>
  `
})
export class Dashboard {}
