import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  handleMenu() {
    const body = document.body;

    if (body.classList.contains('nav-active')) {
      body.classList.remove('nav-active');
    } else {
      body.classList.add('nav-active');
    }
  }

  logout() {
    this.handleMenu();
    this.authService.signOut();
  }
}
