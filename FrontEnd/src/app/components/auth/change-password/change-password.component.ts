import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/sharedServices/toastr.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { Passwords } from 'src/app/models/user';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup

  constructor(private userService: UserService, private router: Router, private toastr: ToasterService, private fb: FormBuilder) {}

  data: Passwords;

  ngOnInit(): void {
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
    })
  }

  onSubmit() {
    if(this.changePasswordForm.valid && this.changePasswordForm.value.newPassword === this.changePasswordForm.value.confirmPasssword) {
      this.userService.changePassword(this.data).subscribe(
        response => {
          this.toastr.showSuccess(response.msg, "Success")
          this.changePasswordForm.reset();
        },
        error => {
          this.toastr.showError(error.error?.msg, "Something Went Wrong");
          this.changePasswordForm.reset();
        }
      )
    } 
    else {
      this.toastr.showError("New and Confirm Password should match.","Something Went Wrong")
    }
  }
}
