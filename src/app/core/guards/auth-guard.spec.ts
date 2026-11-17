import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authGuard } from './auth-guard';
import { AuthService } from '../services/auth';

import { provideRouter } from '@angular/router';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          {
            path: 'login',
            component: class {}
          }
        ])
      ]
    });

  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('debería permitir acceso si el usuario está autenticado', () => {

    const authService =
      TestBed.inject(AuthService);

    authService.login(
      'admin',
      '1234'
    );

    const result =
      executeGuard(
        {} as any,
        {} as any
      );

    expect(result)
      .toBe(true);

  });

  it('debería bloquear acceso si el usuario no está autenticado', () => {

    const authService =
      TestBed.inject(AuthService);

    authService.logout();

    const result =
      executeGuard(
        {} as any,
        {} as any
      );

    expect(result)
      .toBe(false);

  });

});
