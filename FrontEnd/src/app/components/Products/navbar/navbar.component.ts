import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}

 
  isUserLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  navigate(url: string) {
    this.router.navigate([url]);
  }
}
