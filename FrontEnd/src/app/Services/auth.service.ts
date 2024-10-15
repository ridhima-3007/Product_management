import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieService : CookieService, private http: HttpClient, 
    private userService: UserService, private matSnackBar: MatSnackBar, private router: Router) { }

  isLoggedIn() : boolean {
    const token = this.getAccessToken();
    if(token) {
      return !this.isTokenExpired(token);
    }
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

  checkAndRefreshToken(): void {
    const accessToken = this.getAccessToken();
    if(!accessToken) {
      this.router.navigate(['/login']);
      this.matSnackBar.open("You are not logged In", "Close", {
        verticalPosition: 'top',
      });
    }
    else if(accessToken && this.isTokenExpired(accessToken)) {
      this.userService.refreshAccessToken().subscribe(
        response => {
          this.router.navigate(['/login'])
        },
        error => {
          this.router.navigate(['/login']);
          this.matSnackBar.open(error.error?.msg, "Close", {
            verticalPosition: 'top',
          });
  
        }
      )
    } else {
      this.router.navigate(['/login']);
    }
  }
}
