import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserLogin } from 'src/app/models/user';
import { ToasterService } from 'src/app/sharedServices/toastr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: UserLogin;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToasterService
  ) {}

  ngOnInit(): void {
    this.loginFormInit();
  }

  loginFormInit() {
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
    });
  }

  getErrors(field: string) {
    const loginControl = this.loginForm.get(field);
    if (loginControl?.hasError('required')) {
      return `${field.toUpperCase()} is required`;
    }
    if (loginControl?.hasError('email')) {
      return 'Invalid email address';
    }
    if (loginControl?.hasError('pattern')) {
      return 'Password must contain uppercase,lowercase,numbers and special characters.';
    }
    if (loginControl?.hasError('minLength')) {
      return 'Password must be at least 8 characters long.';
    }
    return '';
  }

  navigate(url) {
    this.router.navigate([url]);
  }

  onLogin() {
    const user: UserLogin = { ...this.loginForm.value };

    this.userService.login(user).subscribe(
      (response) => {
        this.toastr.showSuccess('Redirected to Home Page', 'Login Successful');
        this.router.navigate(['/home']);
      },
      (error) => {
        this.toastr.showError(error.error?.msg, 'Something Went Wrong');
        this.loginForm.reset();
        this.router.navigate(['/auth/login']);
      }
    );
  }
}
