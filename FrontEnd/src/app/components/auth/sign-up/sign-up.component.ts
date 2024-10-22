import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ToasterService } from 'src/app/sharedServices/toastr.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private toaster: ToasterService
  ) {}

 
  getErrors(field: string) {
    const signupControl = this.signupForm.get(field);
    if (signupControl?.hasError('required')) {
      return `${field.toUpperCase()} is required`;
    }
    if (signupControl?.hasError('email')) {
      return 'Invalid email address';
    }
    if (signupControl?.hasError('pattern')) {
      if (field === 'name') return 'Name must contain only letters and spaces.';
      else if (field === 'mobile') return 'Invalid Mobile Number.';
      else
        return 'Password must contain uppercase,lowercase,numbers and special characters.';
    }
    if (signupControl?.hasError('minlength')) {
      return 'Password must be at least 8 characters long.';
    }
    if (signupControl?.hasError('maxlength')) {
      if (field === 'name')
        return 'Name cannot be more than 20 characters long.';
      else return 'Mobile no cannot contains more than 10 digits.';
    }
    return '';
  }
  ngOnInit(): void {
    this.signupFormInit();
  }

  signupFormInit() {
    this.signupForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Zs]+$'),
          Validators.maxLength(20),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      mobile: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern('^[6-9][0-9]{9}$'),
        ],
      ],
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

  onSignup() {
    const user: User = { ...this.signupForm.value };

    this.userService.signup(user).subscribe(
      (response) => {
        this.toaster.showSuccess(
          'Now Login to access your Products',
          'Signed Up Successfully'
        );
        this.toaster.showSuccess(
          'Check your mail for verification',
          'Signed Up Successfully'
        );
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error signing up:', error);
        this.toaster.showError(error.error?.msg, 'Something Went Wrong');
        this.toaster.showError('Something Went Wrong', error.error?.msg);
        this.signupForm.reset();
      }
    );
  }
}
