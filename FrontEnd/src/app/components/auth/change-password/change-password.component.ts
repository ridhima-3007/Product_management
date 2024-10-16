import { Component } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  changePasswordForm: FormGroup

  constructor(private userService: UserService, private router: Router, private snackBar: MatSnackBar) {}

  data = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  }

  onSubmit(form: NgForm) {

    if(form.invalid) {
      return;
    }

    this.userService.changePassword(this.data).subscribe(
      response => {
        this.snackBar.open(response.msg , "Close", {
          verticalPosition: 'top',
        });
        form.resetForm();
      },
      error => {
        this.snackBar.open(error.error?.msg, "Close", {
          verticalPosition: 'top',
        });
        form.resetForm();
      }
    )
  }
}
