// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response, CustomError } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.APIURL + '/user';

  constructor(private http: HttpClient) {}

  signup(userData: any): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/signup`, userData);
  }

  login(userData: any): Observable<void> {
    console.log(userData);
    return this.http.post<void>(`${this.apiUrl}/login`, userData);
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/logout`, {});
  }

  refreshAccessToken(): Observable<CustomError> {
    return this.http.post<CustomError>(`${this.apiUrl}/refresh-token`, {});
  }

  changePassword(data): Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/changePassword`, data);
  }
}
