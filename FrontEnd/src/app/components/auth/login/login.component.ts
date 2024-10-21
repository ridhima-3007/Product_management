import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { UserLogin } from 'src/app/models/user';
import { ToasterService } from 'src/app/sharedServices/toastr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup
  user: UserLogin;

  constructor(private userService: UserService, private router: Router, private authService: AuthService, private fb: FormBuilder, private toastr: ToasterService) {}

  ngOnInit(): void {
   this.loginFormInit();
  }

  loginFormInit(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$'),
          Validators.minLength(8),
        ],
      ],
    })
  }

  onLogin() {

    const user: UserLogin = { ...this.loginForm.value };

    this.userService.login(user).subscribe(
      (response) => {
        this.toastr.showSuccess("Redirected to Home Page", "Login Successful")
        this.router.navigate(['/home']);
      },
      (error) => {
        this.toastr.showError(error.error?.msg, "Something Went Wrong");
        this.loginForm.reset();
       }
    )
  }
}
