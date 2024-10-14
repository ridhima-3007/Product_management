import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { TextComponent } from './text/text.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { ForgotPasswordComponent } from './components/auth/forgotpassword/forgotpassword.component';
import { ResetPasswordComponent } from './components/auth/resetpassword/resetpassword.component';
import { ProductuploadComponent } from './components/Products/productupload/productupload.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    TextComponent,
    LogoutComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ProductuploadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
