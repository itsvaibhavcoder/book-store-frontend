import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookSharedService } from '../services/book-shared.service';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.scss']
})
export class ViewBookComponent implements OnInit {
  book: any;
  quantityToBuy: number = 1; 
  isInWishlist: boolean = false; 
  isInBag: boolean = false; 
  cart: any[] = []; 
  wishlist: any[] = []; 
  constructor(
    private bookSharedService: BookSharedService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.book = this.bookSharedService.getBook();
    if (!this.book) {
      this.router.navigate(['/books']);
    } else {
      
      this.isInWishlist = this.wishlist.some(item => item._id === this.book._id);
    }
  }

  addToBag(): void {
    const cartItem = {
      ...this.book,
      quantity: this.quantityToBuy 
    };
    
    
    const existingItem = this.cart.find(item => item._id === cartItem._id);
    if (existingItem) {
      existingItem.quantity += this.quantityToBuy; 
    } else {
      this.cart.push(cartItem); 
    }

    this.isInBag = true; 
    console.log('Cart:', this.cart); 
  }

  
  toggleWishlist(): void {
    if (this.isInWishlist) {
      this.wishlist = this.wishlist.filter(item => item._id !== this.book._id);
    } else {
      this.wishlist.push(this.book);
    }
    this.isInWishlist = !this.isInWishlist; 
    console.log('Wishlist:', this.wishlist); 
  }

  
  decrementQuantity(): void {
    if (this.quantityToBuy > 1) {
      this.quantityToBuy--;
    }
  }

  incrementQuantity(): void {
    this.quantityToBuy++;
  }
}
