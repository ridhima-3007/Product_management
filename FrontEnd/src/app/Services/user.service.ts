// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = environment.APIURL+'/user'; 

    constructor(private http: HttpClient) { }

    signup(userData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/signup`, userData);
    }

    login(userData: any): Observable<any> {
        console.log(userData);
        return this.http.post(`${this.apiUrl}/login`, userData, {withCredentials: true});
    }

    logout(): Observable<any> {
        return this.http.post(`${this.apiUrl}/logout`, {}, {withCredentials: true});
    }

    refreshAccessToken(): Observable<any> {
        return this.http.post(`${this.apiUrl}/refresh-token`, {}, {withCredentials: true});
    }

    changePassword(data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/changePassword`, data, {withCredentials: true});
    }
}
