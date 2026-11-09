import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  authService = inject(AuthService);
  router = inject(Router);

  logout() {

    this.authService.logout();

    this.router.navigate(
      ['/login']
    );

  }

  isAuthenticated() {

    return this.authService.isAuthenticated();

  }
}