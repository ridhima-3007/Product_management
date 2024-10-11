import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import{UserService} from 'src/app/Services/user.service'

import {Router} from '@angular/router'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
 
  user = {
    name: '',
    email: '',
    mobile: null,
    password: ''
};

constructor(private userService: UserService,private router:Router) {}

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
}