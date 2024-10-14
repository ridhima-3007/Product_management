import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { TextComponent } from './text/text.component';
import { ForgotPasswordComponent } from './components/auth/forgotpassword/forgotpassword.component';
import { ResetPasswordComponent } from './components/auth/resetpassword/resetpassword.component';
import { ProductuploadComponent } from './components/Products/productupload/productupload.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: '',
    redirectTo: '/signup',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: TextComponent
  },
  {
    path:'forgotPassword',
    component:ForgotPasswordComponent
  },
  {
    path:'resetPassword',
    component:ResetPasswordComponent
  },
  {
    path:'uploadProduct',
    component:ProductuploadComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
