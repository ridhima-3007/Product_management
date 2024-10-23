import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product,Response } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class AllProductService {
  private apiUrl = environment.APIURL + '/api';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  getMyProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/myProducts`, {
      withCredentials: true,
    });
  }

  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/myProducts/${productId}`, {
      withCredentials: true,
    });
  }

  deleteProduct(productId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/myProducts/${productId}`, {
      withCredentials: true,
    });
  }

  updateProduct(data, productId: string): Observable<Response> {
    return this.http.patch<Response>(`${this.apiUrl}/myProducts/${productId}`, data, {
      withCredentials: true,
    });
  }

  getProductsWithCategories(parameter):Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl}/searchproductWRTcategories`, {withCredentials: true})
  }

}

 
