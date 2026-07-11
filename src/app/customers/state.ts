import { Injectable, signal, computed } from '@angular/core';
import { Customer } from './types';

@Injectable({ providedIn: 'root' })
export class CustomerState {
  private customers = signal<Customer[]>([
    { id: '1', name: 'Acme Corp', email: 'contato@acme.com', phone: '(11) 99999-9999', status: 'active' },
    { id: '2', name: 'Global Tech', email: 'hello@globaltech.com', phone: '(11) 98888-8888', status: 'active' },
    { id: '3', name: 'Inovação SA', email: 'sac@inovacao.com.br', phone: '(21) 97777-7777', status: 'inactive' },
  ]);

  all = computed(() => this.customers());

  getById(id: string) {
    return this.customers().find(c => c.id === id);
  }

  add(customer: Omit<Customer, 'id'>) {
    const newCustomer = { ...customer, id: Math.random().toString(36).substring(2, 9) };
    this.customers.update(c => [...c, newCustomer]);
  }

  update(id: string, updates: Partial<Customer>) {
    this.customers.update(c => c.map(cust => cust.id === id ? { ...cust, ...updates } : cust));
  }

  remove(id: string) {
    this.customers.update(c => c.filter(cust => cust.id !== id));
  }
}
