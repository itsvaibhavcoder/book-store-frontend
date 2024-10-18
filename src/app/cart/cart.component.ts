import { Component, OnInit } from '@angular/core';
import { CartWishlistService } from '../services/cartwishlist.service';
import { BookSharedService } from '../services/book-shared.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  booksInCart: any[] = [];

  constructor(
    private cartWishlistService: CartWishlistService, 
    private bookSharedService: BookSharedService
  ) { }

  ngOnInit(): void {
    this.cartWishlistService.getCart().subscribe((cart) => {
      this.cartItems = cart;
      console.log('Cart Items: ', this.cartItems);
    });

    this.bookSharedService.getBookList().subscribe((books) => {
      this.booksInCart = books.filter((book) => this.cartItems.some((cartItem) => cartItem._id === book._id));
    });
  }
}

