import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth';

describe('AuthService', () => {

  let service: AuthService;

  beforeEach(() => {

    TestBed.configureTestingModule({});

    service = TestBed.inject(AuthService);

    localStorage.clear();


  });

  it('debería iniciar sesión con credenciales válidas', () => {

    service.login(
      'admin',
      '1234'
    );

    expect(
      service.isAuthenticated()
    ).toBe(true);

  });

  it('debería guardar un token', () => {

    service.login(
      'admin',
      '1234'
    );

    expect(
      service.getToken()
    ).toBe('fake-jwt-token');

  });

  it('no debería autenticar con credenciales inválidas', () => {

    service.login(
      'pepe',
      '1234'
    );

    expect(
      service.isAuthenticated()
    ).toBe(false);

  });

  it('debería cerrar sesión', () => {

    service.login(
      'admin',
      '1234'
    );

    service.logout();

    expect(
      service.isAuthenticated()
    ).toBe(false);

  });

  it('debería eliminar el token al cerrar sesión', () => {

    service.login(
      'admin',
      '1234'
    );

    service.logout();

    expect(
      service.getToken()
    ).toBeNull();

  });
  
});