import { Component, OnInit, inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ToasterService } from 'src/app/sharedServices/toastr.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class SignUpComponent implements OnInit {
  signupForm: FormGroup;


  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private toaster: ToasterService,
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
        this.toaster.showSuccess("Check your mail for verification", "Signed Up Successfully")
        this.router.navigate(['/login'])
      },
      (error) => {
        this.toaster.showError("Something Went Wrong",error.error?.msg);
        this.signupForm.reset();
      }
    );
  }
}
