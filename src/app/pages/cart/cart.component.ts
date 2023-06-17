import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html' 
})
export class CartComponent implements OnInit {
  cart: Cart = { items: [{
    product: 'https://via.placeholder.com/150',
    name: 'sneakers',
    price: 150,
    quantity: 1,
    id: 1
  }, {
    product: 'https://via.placeholder.com/150',
    name: 'sneakers',
    price: 150,
    quantity: 1,
    id: 2
  }]};
  dataSource: Array<CartItem> = []
  displayedColumns: Array<string> = ['product', 
  'name', 
  'price', 
  'quantity', 
  'total', 
  'action'
];


  constructor(private CartService: CartService, private http: HttpClient) { }

  ngOnInit(): void {
    this.dataSource = this.cart.items;
    this.CartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }

  getTotal(items: Array<CartItem>): number {
    return this.CartService.getTotal(items);
  }

  onClearCart(): void {
    this.CartService.clearCart();
  }

  onRemoveFromCart(item: CartItem): void {
    this.CartService.removeFromCart(item);
  }

  onAddQuantity(item: CartItem): void {
    this.CartService.addToCart(item);
  }

  onRemoveQuantity(item: CartItem): void {
    this.CartService.removeQuantity(item);
  }

  onCheckout(): void {
    this.http.post('http://localhost:4242/checkout', {
      items: this.cart.items
    }).subscribe(async(res: any) => {
      let stripe = await loadStripe('pk_test_51NJpk5GhU5CJ1e7Yv1WLIL7I58XN3upJsH80nqdNs0bLg3lVkeeZ8T0kPeg9ZaaGxpiedH6knSFRdllByUAM1tQO00NFFhV4EK')
      stripe?.redirectToCheckout({
        sessionId: res.id
      })
    })
  }
}
