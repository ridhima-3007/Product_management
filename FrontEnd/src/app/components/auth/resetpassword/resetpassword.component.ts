import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Services/fp.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  token: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'];
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
      this.resetPasswordForm.valid &&
      this.resetPasswordForm.value.password ==
        this.resetPasswordForm.value.confirmpasssword
    ) {
      this.authService
        .resetPassword(this.token, this.resetPasswordForm.value.password)
        .subscribe({
          next: () => {
            alert('Password reset successful!');
            this.router.navigate(['/login']);
          },
          error: (err) => alert('Error: ' + err.error.message),
        });
    } else {
      alert('TRY AGAIN');
    }
  }
}
