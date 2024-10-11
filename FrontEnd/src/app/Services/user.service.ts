// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'http://localhost:8000/user'; 

    constructor(private http: HttpClient) { }

    signup(userData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/signup`, userData);
    }
}
