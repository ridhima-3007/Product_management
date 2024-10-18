import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(private userService: UserService, private router: Router) {}

  onLogout() {
    this.userService.logout().subscribe(
      response => {
        console.log("User logged out", response);
        this.router.navigate(['/login']);
      },
      error => {
        console.log("Error logging out: ", error.error?.msg);
        this.router.navigate(['/login']);
      }
    );
  }

}
