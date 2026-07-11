import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Auth {
  isAuthenticated = signal(false);

  login(email: string, pass: string) {
    if (email && pass) {
      this.isAuthenticated.set(true);
      return true;
    }
    return false;
  }

  logout() {
    this.isAuthenticated.set(false);
  }
}
