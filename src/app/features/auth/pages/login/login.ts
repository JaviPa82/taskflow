import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html'
})
export class Login {

  authService = inject(AuthService);
  router = inject(Router);

  usuario = signal('');
  password = signal('');

  actualizarUsuario(event: Event) {

    const input =
      event.target as HTMLInputElement;

    this.usuario.set(input.value);
  }

  actualizarPassword(event: Event) {

    const input =
      event.target as HTMLInputElement;

    this.password.set(input.value);
  }

  login() {

   
      this.authService.login(
        this.usuario(),
        this.password()
      );

    if (this.authService.isAuthenticated()) {

      this.router.navigate(
        ['/pendientes']
      );

    }

  }
  

}