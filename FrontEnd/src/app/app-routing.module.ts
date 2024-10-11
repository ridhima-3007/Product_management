import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { TextComponent } from './text/text.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
