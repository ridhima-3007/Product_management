import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product,Response } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class AllProductService {
  private apiUrl = environment.APIURL + '/api';

  constructor(private http: HttpClient) {}


  getProducts(
    page: number,
    limit: number,
    filters: any,
    sortBy: string,
    order: string
  ): Observable<{ Allproducts: Product[]; totalProducts: number }> {
    let params = new HttpParams()
      .set('page', page)
      .set('limit', limit);

    if (filters.category) params = params.set('category', filters.category);
    if (filters.subcategory)
      params = params.set('subcategory', filters.subcategory);
    if (filters.seller) params = params.set('seller', filters.seller);
    if (filters.priceRange) params = params.set('priceRange', filters.priceRange);
    if (filters.discountRange)
      params = params.set('discountRange', filters.discountRange);
    if (filters.searchTerm) params = params.set('searchTerm', filters.searchTerm);

    if (sortBy && order) {
      params = params.set('sortBy', sortBy).set('order', order);
    }
    return this.http.get<{ Allproducts: Product[]; totalProducts: number }>(
      `${this.apiUrl}/products`,
      { params }
    );
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

 
