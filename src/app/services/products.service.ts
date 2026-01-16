import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '../store/models/product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly http = inject(HttpClient);

  // Get all products
  getAllProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`${environment.API_URL}`);
  }

  // Get limited products
  getLimitedProducts(limit: number): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(
      `${environment.API_URL}?limit=${limit}`
    );
  }

  // Get product details by product id
  getProductDetails(id: number): Observable<ProductModel> {
    return this.http.get<ProductModel>(`${environment.API_URL}/${id}`);
  }
}
