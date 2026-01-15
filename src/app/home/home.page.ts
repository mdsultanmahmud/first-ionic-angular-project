import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductInterface } from 'src/app/services/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
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
export class HomePage implements OnInit {
  private productService = inject(ProductsService);
  products: ProductInterface[] = [];
  loading = true;
  // Cart Service import
  private cartService = inject(CartService);
  pages = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products-list' },
    { name: 'Cart', path: '/cart' },
  ];

  ngOnInit(): void {
    this.loadLimitedProducts();
  }
  loadLimitedProducts() {
    this.productService.getLimitedProducts(8).subscribe({
      next: (res) => {
        this.products = res;
        this.loading = false;

        console.log(this.products);
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  // Add to cart products

  addToCart(prod: ProductInterface) {
    this.cartService.addToCart(prod);
    console.log('prdouct added in your cart');
  }
}
