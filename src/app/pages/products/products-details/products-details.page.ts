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
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { finalize } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.page.html',
  styleUrls: ['./products-details.page.scss'],
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
export class ProductsDetailsPage implements OnInit {
  product: ProductInterface | null = null;
  isLoading: boolean = false;
  private route = inject(ActivatedRoute);

  // Product Service import
  private productService = inject(ProductsService);

  // Cart Service import
  private cartService = inject(CartService);

  constructor() {}

  ngOnInit() {
    // Get dynamic product id
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Call product details api function
    if (id) {
      this.getProductDetails(id);
    }
  }

  // Products Details Api function
  getProductDetails(id: number) {
    this.isLoading = true;
    this.productService
      .getProductDetails(id)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (res) => {
          console.log('Product Details Response: ', res);
          this.product = res;
        },
        error: (err) => {
          console.log('Error while fetching products details: ', err);
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
