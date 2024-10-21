import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/fp.service';
import { ToasterService } from 'src/app/sharedServices/toastr.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  message: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toasterservice: ToasterService
  ) {}

  get email() {
    return this.forgotPasswordForm.get('email');
  }

  ngOnInit(): void {
    this.forgotPasswordFormInit();
  }

  forgotPasswordFormInit() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    this.authService
      .forgotPassword(this.forgotPasswordForm.value.email)
      .subscribe(
        (response) => {
          this.toasterservice.showSuccess(
            'Password reset mail has been sent',
            'Check your mail'
          );
        },
        (error) => {
          this.toasterservice.showError(error.error?.msg, 'Error occured');
        }
      );
  }
}
