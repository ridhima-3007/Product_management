import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm : FormGroup

  user = {
    email: '',
    password: '',
  };

  errorMessage = ''

  constructor(private userService: UserService, private router: Router, private authService: AuthService) {}

  onLogin(form: NgForm) {
    if(form.invalid) {
      return;
    }

    console.log(this.user);
    
    this.userService.login(this.user).subscribe(
      response => {
        console.log("User login successful", response);
        this.router.navigate(['/home']);
      },
      error => {
        this.errorMessage = error.error?.msg;
        this.user.email = '';
        this.user.password = ''
        this.router.navigate(['/login']);
      }
    )
  }

  removeError() {
    this.errorMessage = ''
  }
}
