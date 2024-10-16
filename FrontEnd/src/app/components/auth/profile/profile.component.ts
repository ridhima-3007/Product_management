import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(private authService: AuthService) {}
  show_profile : boolean = false;
  show_modal : boolean = false;

  user = this.authService.getUserInfo();

  displayProfile() {
    this.show_profile = !this.show_profile;
  }

  displayChangePasswordModal() {
    this.show_modal = !this.show_modal;
  }
}
