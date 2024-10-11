import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgForm } from '@angular/forms';
import{UserService} from 'src/app/Services/user.service'

import {Router} from '@angular/router'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

signupForm:FormGroup;

  constructor(private userService: UserService,private router:Router,private fb:FormBuilder) {}

  ngOnInit(): void {
    // this.signupForm = this.fb.group({
    //   name: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z]+$')]],

    //   email: ['', [Validators.required, Validators.email]],

    //   mobile: ['', [Validators.required, Validators.pattern('^[6-9][0-9]{10}$')]],

    //   password: ['', [Validators.required, Validators.minLength(8)]],
    // });
  }
 
  user = {
    name: '',
    email: '',
    mobile: null,
    password: ''
};

onSignup(form: NgForm) {
    if (form.invalid) {
        return; 
    }

    this.userService.signup(this.user).subscribe(
        response => {
            console.log('User signed up successfully:', response);
            this.router.navigate(['/login']);
        },
        error => {
            console.error('Error signing up:', error);
        }
    );
}

// get f() {
//   return this.signupForm.controls;
// }

}