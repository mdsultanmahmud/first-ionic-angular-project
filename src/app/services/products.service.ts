import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductInterface } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // base api url
  private API_URL = 'https://fakestoreapi.com/products';
  private http = inject(HttpClient);

  // Get all products
  getAllProducts(): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(`${this.API_URL}`);
  }

  // Get limited products
  getLimitedProducts(limit: number): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(`${this.API_URL}?limit=${limit}`);
  }

  // Get product details by product id
  getProductDetails(id: number): Observable<ProductInterface> {
    return this.http.get<ProductInterface>(`${this.API_URL}/${id}`);
  }
}
