import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { CartService } from 'src/app/services/cart.service';
import { RouterModule } from '@angular/router';
import { ProductModel } from 'src/app/store/models/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterModule,
  ],
})
export class CartPage implements OnInit {
  private cartService = inject(CartService);
  // Initialize cart items as empty array
  cartItems: ProductModel[] = [];
  constructor() {}

  ngOnInit() {
    this.cartService.cart$.subscribe((items) => {
      this.cartItems = items;
      // console.log('Our all cart Items: ', this.cartItems);
    });
  }
  // Remove Single item
  removeProductFromCart(id: number) {
    this.cartService.removeItemFromCart(id);
    console.log('Product remove from cart!');
  }

  // Remove All Item
  removeAllItem() {
    this.cartService.clearCart();
  }

  // Menu Items
  pages = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products-list' },
    { name: 'Cart', path: '/cart' },
  ];
}
