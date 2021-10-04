import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartSubjectService {

  public cart$ = new Subject();
  public cartItems = 0;

  constructor() {
    this.cart$.asObservable();
  }
 
  addItemToCart() {

    this.cartItems++;
    this.cart$.next( this.cartItems );
  }

  removeCartItem() {
    if( this.cartItems > 0 ) {

      this.cartItems--;
    }
    this.cart$.next( this.cartItems );
  }

  getCartCnt() {
    return this.cartItems;
  }
}
