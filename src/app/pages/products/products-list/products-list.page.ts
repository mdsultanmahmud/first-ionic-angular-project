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
import { ProductsService } from 'src/app/services/products.service';
import { finalize } from 'rxjs';
import { RouterModule } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.page.html',
  styleUrls: ['./products-list.page.scss'],
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
export class ProductsListPage implements OnInit {
  isLoading: boolean = false;
  products: ProductInterface[] = [];
  productService = inject(ProductsService);

  // Cart Service import
  private cartService = inject(CartService);
  constructor() {}

  ngOnInit() {
    this.getAllProducts();
  }

  // Load products from api
  getAllProducts() {
    this.isLoading = true;
    this.productService
      .getAllProducts()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (res) => {
          this.products = res;
          console.log('all products response: ', res);
        },
        error: (err) => {
          console.log('Error while fetching all prdoucts: ', err);
        },
      });
  }

  // Add to cart products

  addToCart(prod: ProductInterface) {
    this.cartService.addToCart(prod);
    console.log('prdouct added in your cart');
  }
  // Menu Items
  pages = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products-list' },
    { name: 'Cart', path: '/cart' },
  ];
}
