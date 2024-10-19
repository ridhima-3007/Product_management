import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/auth/forgotpassword/forgotpassword.component';
import { ResetPasswordComponent } from './components/auth/resetpassword/resetpassword.component';
import { ProductuploadComponent } from './components/Products/productupload/productupload.component';
import { HomeComponent } from './components/Products/home/home.component';
import { NavbarComponent } from './components/Products/navbar/navbar.component';
import { CategoryListComponent } from './components/Products/category-list/category-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MylistingsComponent } from './components/Products/mylistings/mylistings.component';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { ChangePasswordComponent } from './components/auth/change-password/change-password.component';
import { ToastrModule } from 'ngx-toastr';
import { SearchComponent } from './components/Products/search/search.component';
import { VerifyUserComponent } from './components/auth/verify-user/verify-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ProductuploadComponent,
    HomeComponent,
    NavbarComponent,
    CategoryListComponent,
    MylistingsComponent,
    ProfileComponent,
    ChangePasswordComponent,
    SearchComponent,
    VerifyUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    ToastrModule.forRoot(),
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
