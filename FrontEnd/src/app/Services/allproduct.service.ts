import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })

export class AllProductService{
    private apiUrl = environment.APIURL+'/api'; 

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`);
  }

  getMyProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/myProducts`, {withCredentials: true})
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/myProducts/${productId}`, {withCredentials: true});
  }

}