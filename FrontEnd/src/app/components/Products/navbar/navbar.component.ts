import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  showSearchBar = false;

  constructor(private authService: AuthService, private router: Router) {}

  isUserLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  navigate(url: string) {
    this.router.navigate([url]);
  }
}
