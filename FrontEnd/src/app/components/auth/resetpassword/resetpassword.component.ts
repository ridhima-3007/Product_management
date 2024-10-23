import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/fp.service';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/sharedServices/toastr.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toasterservice: ToasterService
  ) {}

  ngOnInit(): void {
    this.resetFormInit();
  }

  resetFormInit() {
    this.resetPasswordForm = this.fb.group({
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$'),
        ],
      ],

      confirmpasssword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$'),
        ],
      ],
    });
  }

  getErrors(field: string) {
    const PasswordControl = this.resetPasswordForm.get(field);
    if (PasswordControl?.hasError('required')) {
      return 'Password is required';
    }
    if (PasswordControl?.hasError('pattern')) {
      return 'Password must contain uppercase,lowercase,numbers and special characters.';
    }
    return '';
  }

  onSubmit() {
    if (
      this.resetPasswordForm.value.password ===
      this.resetPasswordForm.value.confirmpasssword
    ) {
      this.authService
        .resetPassword(this.resetPasswordForm.value.password)
        .subscribe({
          next: () => {
            this.toasterservice.showSuccess(
              'Password Reset',
              'You can Login now'
            ),
              this.router.navigate(['/login']);
          },
          error: (err) => {
            this.toasterservice.showError('Error occured', err.error?.msg);
          },
        });
    } else {
      this.toasterservice.showError(
        'Passwords does not match',
        'Error occured'
      );
    }
  }
}
