// category.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = environment.APIURL+'/categories'; 

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Array<string>> {
    return this.http.get<Array<string>>(this.apiUrl);
  }

}
