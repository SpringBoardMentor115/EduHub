import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private isLoggedInStatus: boolean = false;
  private token: string | null = null;

  constructor() {
    this.isLoggedInStatus = this.getLoginStatus();
    this.token = this.getToken();
  }

  setToken(token: string): void {
    this.token = token;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  getToken(): string | null {
    return this.token || (typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null);
  }

  getLoginStatus(): boolean {
    if (typeof localStorage !== 'undefined') {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      return isLoggedIn ? JSON.parse(isLoggedIn) : false;
    } else {
      return false;
    }
  }

  setLoginStatus(status: boolean): void {
    this.isLoggedInStatus = status;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('isLoggedIn', status.toString());
    }
  }

  isLoggedIn(): boolean {
    return this.isLoggedInStatus || this.getLoginStatus();
  }

  logout(): void {
    this.isLoggedInStatus = false;
    this.token = null;
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('isLoggedIn');
    }
  }
}