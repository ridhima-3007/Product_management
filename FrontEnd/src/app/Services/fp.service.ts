import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.APIURL;

  constructor(private http: HttpClient) {}

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/forgotPassword`, { email },{withCredentials: true});
  }

  resetPassword(password: string): Observable<any> {
    return this.http.post(
      'http://localhost:8000/user/resetPassword', 
      { password },  
      { withCredentials: true } 
    );
  }
  
}
