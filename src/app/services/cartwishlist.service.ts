import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartWishlistService {
  private cart: any[] = [];
  private wishlist: any[] = [];

  constructor() {}

  addToCart(book: any, quantity: number = 1): void {
    const existingItem = this.cart.find((item) => item._id === book._id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.push({ ...book, quantity });
    }
    console.log('Cart:', this.cart);
  }

  removeFromCart(bookId: string): void {
    this.cart = this.cart.filter((item) => item._id !== bookId);
  }

  toggleWishlist(book: any): void {
    const existingItem = this.wishlist.find((item) => item._id === book._id);
    if (existingItem) {
      this.wishlist = this.wishlist.filter((item) => item._id !== book._id);
    } else {
      this.wishlist.push(book);
    }
    console.log('Wishlist:', this.wishlist);
  }

  isInCart(bookId: string): boolean {
    return this.cart.some((item) => item._id === bookId);
  }

  isInWishlist(bookId: string): boolean {
    return this.wishlist.some((item) => item._id === bookId);
  }

  getCart(): any[] {
    return this.cart;
  }

  getWishlist(): any[] {
    return this.wishlist;
  }
}
