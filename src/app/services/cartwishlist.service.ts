import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartWishlistService {
  private cart = new BehaviorSubject<any[]>([]);
  private wishlist = new BehaviorSubject<any[]>([]);

  constructor() {}

  // addToCart(book: any, quantity: number = 1): void {
  //   let currentCart = this.cart.getValue();
  //   const existingItem = currentCart.find((item) => item._id === book._id);

  //   if (existingItem) {
  //     existingItem.quantity += quantity;
  //   } else {
  //     currentCart.push({ ...book, quantity });
  //   }
  //   this.cart.next(currentCart);
  // }

  addToCart(book: any, quantityToBuy: number = 1): void {
    let currentCart = [...this.cart.getValue()]; 
    const existingItem = currentCart.find((item) => item._id === book._id);
  
    if (existingItem) {
  
      const updatedItem = { ...existingItem, quantityToBuy: existingItem.quantityToBuy + quantityToBuy };
      currentCart = currentCart.map(item => item._id === book._id ? updatedItem : item);
    } else {
    
      currentCart.push({ ...book, quantityToBuy });
    }
  
    this.cart.next(currentCart);
    console.log('Updated Cart:', currentCart);
  }
  
  updateQuantity(bookId: string, quantityToBuy: number): void {
    let currentCart = this.cart.getValue();
    const existingItem = currentCart.find((item) => item._id === bookId);

    if (existingItem) {
      existingItem.quantityToBuy = quantityToBuy;
    }

    this.cart.next(currentCart);
  }


  removeFromCart(bookId: string): void {
    let currentCart = this.cart.getValue();
    currentCart = currentCart.filter((item) => item._id !== bookId);
    this.cart.next(currentCart);
  }

  toggleWishlist(book: any): void {
    let currentWishlist = this.wishlist.getValue();
    const existingItem = currentWishlist.find((item) => item._id === book._id);

    if (existingItem) {
      currentWishlist = currentWishlist.filter((item) => item._id !== book._id);
    } else {
      currentWishlist.push(book);
    }

    this.wishlist.next(currentWishlist); 
    console.log('Wishlist:', currentWishlist);
  }

  isInCart(bookId: string): boolean {
    return this.cart.getValue().some((item) => item._id === bookId);
  }

  isInWishlist(bookId: string): boolean {
    return this.wishlist.getValue().some((item) => item._id === bookId);
  }

  getCart() {
    return this.cart.asObservable();
  }

  getWishlist() {
    return this.wishlist.asObservable();
  }
}
