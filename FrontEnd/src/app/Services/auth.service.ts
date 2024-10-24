import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './user.service';
import { ToasterService } from '../sharedServices/toastr.service';
import {CustomError} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieService : CookieService, private http: HttpClient, 
    private userService: UserService, private toasterservice:ToasterService, private router: Router) { }

  private userInfo = null;

  isLoggedIn() {
    const token = this.getAccessToken();
    if(token) {
      const notExpired = !this.isTokenExpired(token);
      if(notExpired) {
        this.setUserInfo(token);
      } else {
        this.userInfo = null;
      }
      return notExpired;
    }
    this.userInfo = null;
    return false;
  }

  getAccessToken() : string | null {
    return this.cookieService.get('accessToken');
  }

  isTokenExpired(token : string) : boolean {
    const decodedToken: any = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
  }

  setUserInfo(token:string) {
    const decodedToken: any = jwtDecode(token);
    this.userInfo = decodedToken?.curUser || null;
  }

  getUserInfo() {
    return this.userInfo;
  }

  checkAndRefreshToken(): void {
    this.userService.refreshAccessToken().subscribe(
      (error:CustomError) => {
        this.router.navigate(['/login']);
       this.toasterservice.showError(error.error?.msg,'Error Occured')
      }
    )
  }
}
