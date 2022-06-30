import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  authService: AuthService;

  @ViewChild('closeSidebar') eCloseSidebar!: ElementRef;
  @ViewChild('sidebar') eSidebar!: ElementRef;

  classToOpenSidebar = "sidebar-container--opened";

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  logout() {
    this.authService.signOut();
  }

  toggle() {
    let isSidebarOpened = this.eSidebar.nativeElement.classList.contains(this.classToOpenSidebar);

    if (isSidebarOpened) {
      this.eSidebar.nativeElement.classList.remove(this.classToOpenSidebar);
      this.eCloseSidebar.nativeElement.classList.remove(this.classToOpenSidebar);
    } else {
      this.eSidebar.nativeElement.classList.add(this.classToOpenSidebar);
      this.eCloseSidebar.nativeElement.classList.add(this.classToOpenSidebar);
    }
  }
}
