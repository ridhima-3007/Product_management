import { Component, OnInit,inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgForm } from '@angular/forms';
import{UserService} from 'src/app/Services/user.service'

import {Router} from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {

signupForm:FormGroup;

  constructor(private userService: UserService,private router:Router,private fb:FormBuilder,private snackbar:MatSnackBar) {}


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
            this.snackbar.open("User already exists","Close",{
              verticalPosition:'top', 
            });
           this.signupForm.reset();
        }
    );
}


}