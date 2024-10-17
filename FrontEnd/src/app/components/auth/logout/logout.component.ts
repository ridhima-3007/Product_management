import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { ToasterService } from 'src/app/sharedServices/toastr.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(private userService: UserService, private router: Router, private toaster: ToasterService) {}

  onLogout() {
    this.userService.logout().subscribe(
      response => {
        this.toaster.showSuccess("Login again to continue", "Logout Out Successfully")
        this.router.navigate(['/login']);
      },
      error => {
        this.toaster.showError("Error logging out", "Something Went Wrong")
        this.router.navigate(['/login']);
      }
    );
  }

}
