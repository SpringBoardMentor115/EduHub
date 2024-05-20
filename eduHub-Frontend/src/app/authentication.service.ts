import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private isLoggedInStatus: boolean = false;
  private token: string | null = null;
  private username: string | null = null;
  private readonly tokenKey = 'authToken';
  private readonly usernameKey = 'username';
  private readonly loginStatusKey = 'isLoggedIn';

  constructor() {
    this.isLoggedInStatus = this.getLoginStatus();
    this.token = this.getToken();
    this.username = this.getStoredUsername();
  }

  setToken(token: string): void {
    this.token = token;
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  getToken(): string | null {
    if (this.isLocalStorageAvailable()) {
      return this.token || localStorage.getItem(this.tokenKey);
    }
    return this.token;
  }

  setUsername(username: string): void {
    this.username = username;
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.usernameKey, username);
    }
  }

  getUsername(): string | null {
    if (this.isLocalStorageAvailable()) {
      return this.username || localStorage.getItem(this.usernameKey);
    }
    return this.username;
  }

  clear(): void {
    this.token = null;
    this.username = null;
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.usernameKey);
      localStorage.removeItem(this.loginStatusKey);
    }
  }

  getLoginStatus(): boolean {
    if (this.isLocalStorageAvailable()) {
      const isLoggedIn = localStorage.getItem(this.loginStatusKey);
      return isLoggedIn ? JSON.parse(isLoggedIn) : false;
    }
    return false;
  }

  setLoginStatus(status: boolean): void {
    this.isLoggedInStatus = status;
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.loginStatusKey, JSON.stringify(status));
    }
  }

  isLoggedIn(): boolean {
    return this.isLoggedInStatus || this.getLoginStatus();
  }

  logout(): void {
    this.isLoggedInStatus = false;
    this.clear();
  }

  private getStoredUsername(): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem(this.usernameKey);
    }
    return null;
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__localStorageTest__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
}
