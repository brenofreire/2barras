import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User, LoginCredentials, LoginResponse } from '../models/user.model';
import { HttpService } from './http-client.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSignal = signal<User | null>(null);

  constructor(private router: Router, private httpClient: HttpService) {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSignal.set(JSON.parse(savedUser));
    }
  }

  get currentUser() {
    return this.currentUserSignal.asReadonly();
  }

  get isLoggedIn(): boolean {
    return this.currentUserSignal() !== null;
  }

  get isAdmin(): boolean {
    return this.currentUserSignal()?.role === 'ADMIN';
  }

  login(credentials: LoginCredentials): Promise<boolean> {
    return new Promise(async (resolve) => {
      try {
        const { data } = await this.httpClient.post<LoginResponse>('auth/login', credentials);

        if (data) {
          this.currentUserSignal.set(data.data.user);
          localStorage.setItem('currentUser', JSON.stringify(data.data.user));
          localStorage.setItem('token', JSON.stringify(data.data.token));

          if (data.data.user.role === 'ADMIN') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/user']);
          }

          resolve(true);
        } else {
          resolve(false);
        }
      } catch (error) {
        resolve(false);
      }
    });
  }

  logout(): void {
    this.currentUserSignal.set(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
