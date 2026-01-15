import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { ProductInterface } from 'src/app/services/interfaces';
import { CartService } from 'src/app/services/cart.service';
import { RouterModule } from '@angular/router';

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
  // Initialize cart items as empty array
  cartItems: ProductInterface[] = [];
  // import cartService
  private cartService = inject(CartService);
  constructor() {}

  ngOnInit() {
    this.cartService.cart$.subscribe((items) => {
      this.cartItems = items;
      // console.log('Our all cart Items: ', this.cartItems);
    });
  }

  removeProductFromCart(id: number) {
    this.cartService.removeItemFromCart(id);
    console.log('Product remove from cart!');
  }

  // Menu Items
  pages = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products-list' },
    { name: 'Cart', path: '/cart' },
  ];
}
