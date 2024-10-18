import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookSharedService } from '../services/book-shared.service';
import { CartWishlistService } from '../services/cartwishlist.service';

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

  constructor(
    private bookSharedService: BookSharedService,
    private cartWishlistService: CartWishlistService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.book = this.bookSharedService.getBook();
    if (!this.book) {
      this.router.navigate(['/books']);
    } else {
      this.isInBag = this.cartWishlistService.isInCart(this.book._id);
      this.isInWishlist = this.cartWishlistService.isInWishlist(this.book._id);
    }
  }

  addToBag(): void {
    this.cartWishlistService.addToCart(this.book, this.quantityToBuy); 
    this.isInBag = true;
    this.cartWishlistService.getCart().subscribe(cart => {
      console.log('Cart after adding to bag:', cart);
    });
  }

  toggleWishlist(): void {
    this.cartWishlistService.toggleWishlist(this.book);
    this.isInWishlist = this.cartWishlistService.isInWishlist(this.book._id);
  }

  decrementQuantity(): void {
    if (this.quantityToBuy > 1) {
      this.quantityToBuy--;
      this.cartWishlistService.updateQuantity(this.book._id, this.quantityToBuy);
    }
  }

  incrementQuantity(): void {
    this.quantityToBuy++;
    this.cartWishlistService.updateQuantity(this.book._id, this.quantityToBuy);
  }
}
