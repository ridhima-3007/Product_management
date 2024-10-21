import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/fp.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get email() {
    return this.forgotPasswordForm.get('email');
  }

  getErrors(field) {
    const PasswordControl = this.forgotPasswordForm.get(field);
    if (PasswordControl?.hasError('required')) {
      return 'Email is required';
    }
    if (PasswordControl?.hasError('email')) {
      return 'Invalid email address';
    }
    return '';
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.authService
        .forgotPassword(this.forgotPasswordForm.value.email)
        .subscribe({
          next: () => {
            this.message =
              'Password reset instructions have been sent to your email!';
          },
          error: (err) => {
            this.message = 'Error: ' + err.error.message;
          },
        });
    }
  }
}
