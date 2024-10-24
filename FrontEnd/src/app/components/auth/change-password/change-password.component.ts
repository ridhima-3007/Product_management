import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { Passwords } from 'src/app/models/user';
import { ToasterService } from 'src/app/sharedServices/toastr.service';
import { Response } from 'src/app/models/product';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToasterService,
    private fb: FormBuilder
  ) {}

  data: Passwords;

  ngOnInit(): void {
    this.changePasswordFormInit();
  }

  changePasswordFormInit() {
    this.changePasswordForm = this.fb.group({
      oldPassword: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$'),
        ],
      ],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$'),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$'),
        ],
      ],
    });
  }

  getErrors(field: string) {
    const PasswordControl = this.changePasswordForm.get(field);
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
      this.changePasswordForm.valid &&
      this.changePasswordForm.value.newPassword ===
        this.changePasswordForm.value.confirmPassword
    ) {
      const data: Passwords = { ...this.changePasswordForm.value };
      if (
        this.changePasswordForm.valid &&
        this.changePasswordForm.value.newPassword ===
          this.changePasswordForm.value.confirmPassword
      ) {
        const data: Passwords = { ...this.changePasswordForm.value };
        this.userService.changePassword(data).subscribe(
          (response:Response) => {
            this.toastr.showSuccess(response.msg, 'Success');
            this.changePasswordForm.reset();
          },

          (error) => {
            this.toastr.showError(error.error?.msg, 'Something Went Wrong');
            this.changePasswordForm.reset();
          }
        );
      }
    } else {
      this.toastr.showError(
        'New and Confirm Password should match.',
        'Something Went Wrong'
      );
      this.changePasswordForm.reset();
    }
  }
}
