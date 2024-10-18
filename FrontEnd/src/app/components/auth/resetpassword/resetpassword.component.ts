import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$'),
        ],
      ],
      confirmpassword: [
        '', // Fixed the typo
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$'),
        ],
      ],
    });
  }

  onSubmit() {
    if (
      this.resetPasswordForm.valid &&
      this.resetPasswordForm.value.password === this.resetPasswordForm.value.confirmpassword
    ) {
      // Call the authService to reset the password
      this.authService.resetPassword(this.resetPasswordForm.value.password).subscribe({
        next: () => {
          alert('Password reset successful!');
          this.router.navigate(['/login']);
        },
        error: (err) => alert('Error: ' + err.error.message),
      });
    } else {
      alert('Passwords do not match or form is invalid.');
    }
  }
}
