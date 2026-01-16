import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductModel } from '../store/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject = new BehaviorSubject<ProductModel[]>([]);

  // Protect cart
  cart$ = this.cartSubject.asObservable();

  // Get cart item
  get getCartItems(): ProductModel[] {
    return this.cartSubject.value;
  }

  // Add to cart
  addToCart(product: ProductModel) {
    const updatedCart = [...this.cartSubject.value, product];
    this.cartSubject.next(updatedCart);
  }

  // Remove Item from cart
  removeItemFromCart(id: number) {
    const updatedCart = this.cartSubject.value.filter((item) => item.id !== id);
    this.cartSubject.next(updatedCart);
  }

  // Clear total item from cart
  clearCart() {
    this.cartSubject.next([]);
  }
}
