import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY =
    'taskflow_token';

  authenticated = signal(
    !!localStorage.getItem('taskflow_token')
  );

  login(
    usuario: string,
    password: string
  ): void {

    if (
      usuario === 'admin' &&
      password === '1234'
    ) {

      localStorage.setItem(
        this.TOKEN_KEY,
        'fake-jwt-token'
      );

      this.authenticated.set(true);

      return;
    }

    this.authenticated.set(false);
  }

 logout(): void {

  localStorage.removeItem(
    this.TOKEN_KEY
  );

  this.authenticated.set(false);

}

  getToken(): string | null {

    return localStorage.getItem(
      this.TOKEN_KEY
    );
  }

  isAuthenticated(): boolean {

    return this.authenticated();
  }
}