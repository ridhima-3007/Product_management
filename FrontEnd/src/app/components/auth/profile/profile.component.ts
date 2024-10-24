import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from 'src/app/Services/user.service';
import { ToasterService } from 'src/app/sharedServices/toastr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private toaster: ToasterService,
    private router: Router
  ) {}
  show_profile: boolean = false;
  show_modal: boolean = false;

  user = this.authService.getUserInfo();

  displayProfile() {
    this.show_profile = !this.show_profile;
  }

  displayChangePasswordModal() {
    this.show_modal = !this.show_modal;
  }

  onLogout() {
    this.userService.logout().subscribe(
      (response) => {
        this.toaster.showSuccess(
          'Login again to continue',
          'Logout Out Successfully'
        );
      },
      (error) => {
        this.toaster.showError('Error logging out', 'Something Went Wrong');
      }
    );
    this.router.navigate(['/auth/login']);
  }
}
