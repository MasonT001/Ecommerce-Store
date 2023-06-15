import { Component, Input, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from '../../models/cart.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  private _cart: Cart = { items: [] };
  itemsQuantity = 0;

  @Input()
  get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;

    this.itemsQuantity = this.cart.items.map((item) => item.quantity).reduce((prev, curr) => prev + curr, 0)
  }

  constructor(private CartService: CartService) { }

  ngOnInit(): void {
  }

  getTotal(items: Array<CartItem>): number {
    return this.CartService.getTotal(items);
  }

  onClearCart(): void {
    this.CartService.clearCart();
  }

}
