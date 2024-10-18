import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/auth/forgotpassword/forgotpassword.component';
import { ResetPasswordComponent } from './components/auth/resetpassword/resetpassword.component';
import { ProductuploadComponent } from './components/Products/productupload/productupload.component';
import { HomeComponent } from './components/Products/home/home.component';
import { authGuard } from './guards/auth.guard';
import { MylistingsComponent } from './components/Products/mylistings/mylistings.component';
import { VerifyUserComponent } from './components/auth/verify-user/verify-user.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent,
  },
  {
    path: 'resetPassword',
    component: ResetPasswordComponent,
  },
  {
    path: 'uploadProduct',
    canActivate: [authGuard],
    component: ProductuploadComponent,
  },
  {
    path: 'myListings',
    canActivate: [authGuard],
    component: MylistingsComponent,
  },
  {
    path: 'verify-email',
    component: VerifyUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
