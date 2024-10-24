import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgotpassword/forgotpassword.component';
import { VerifyUserComponent } from './verify-user/verify-user.component';
import { ResetPasswordComponent } from './resetpassword/resetpassword.component';
import { SharedModule } from 'src/app/Modules/shared.module';
@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyUserComponent,
    ResetPasswordComponent,
  ],
  imports: [SharedModule],
  exports: [
    LoginComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyUserComponent,
    ResetPasswordComponent,
    SharedModule,
  ],
})
export class authModule {}
