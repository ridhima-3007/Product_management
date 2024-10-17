import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from 'src/app/Services/user.service';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;


  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void { this.signupForm = this.fb.group({
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
        console.log('User signed up successfully:', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error signing up:', error);
        this.snackbar.open('User already exists', 'Close', {
          verticalPosition: 'top',
        });
        this.signupForm.reset();
      }
    );
  }
}
