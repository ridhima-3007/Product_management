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

  forgotPassword(email: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/user/forgotPassword`, { email },{withCredentials: true});
  }

  resetPassword(password: string): Observable<void> {
    return this.http.post<void>(
      environment.APIURL+'/user/resetPassword', 
      { password },  
      { withCredentials: true } 
    );
  }
  
}
