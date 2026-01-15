import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'products-list',
    loadComponent: () =>
      import('./pages/products/products-list/products-list.page').then(
        (m) => m.ProductsListPage
      ),
  },
  {
    path: 'products-details/:id',
    loadComponent: () =>
      import('./pages/products/products-details/products-details.page').then(
        (m) => m.ProductsDetailsPage
      ),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./pages/cart/cart.page').then((m) => m.CartPage),
  },
];
