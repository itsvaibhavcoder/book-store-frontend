// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { BookSharedService } from '../services/book-shared.service';
// import { CartWishlistService } from '../services/cartwishlist.service';
// import { CartService } from '../services/cart-service/cart.service';
// @Component({
//   selector: 'app-view-book',
//   templateUrl: './view-book.component.html',
//   styleUrls: ['./view-book.component.scss']
// })
// export class ViewBookComponent implements OnInit {
//   book: any;
//   quantityToBuy: number = 1;
//   isInWishlist: boolean = false;
//   isInBag: boolean = false;

//   constructor(
//     private bookSharedService: BookSharedService,
//     private cartWishlistService: CartWishlistService, 
//     private router: Router,
//     private cartService: CartService
//   ) {}

//   ngOnInit(): void {
//     this.book = this.bookSharedService.getBook();
//     if (!this.book) {
//       this.router.navigate(['/books']);
//     } else {
//       this.isInBag = this.cartWishlistService.isInCart(this.book._id);
//       this.isInWishlist = this.cartWishlistService.isInWishlist(this.book._id);
//     }
//   }

//   addToBag(): void {
//     this.cartWishlistService.addToCart(this.book, this.quantityToBuy); 
//     this.isInBag = true;

//     //actual backend call api
//     this.cartService.addBookToCart(`cart/${this.book._id}`,this.book).subscribe({
//         next: (res:any) => {
//           console.log(res); 
//         },
//         error: (err:any) => {  
//           console.log(err.message); 
//         }
//       });
    
//     //
//     this.cartWishlistService.getCart().subscribe(cart => {
//       console.log('Cart after adding to bag:', cart);
//     });

//   }

//   toggleWishlist(): void {
//     this.cartWishlistService.toggleWishlist(this.book);
//     this.isInWishlist = this.cartWishlistService.isInWishlist(this.book._id);
//   }

//   decrementQuantity(): void {
//     if (this.quantityToBuy > 1) {
//       this.quantityToBuy--;
//       this.cartWishlistService.updateQuantity(this.book._id, this.quantityToBuy);
//     }
//   }

//   incrementQuantity(): void {
//     this.quantityToBuy++;
//     this.cartWishlistService.updateQuantity(this.book._id, this.quantityToBuy);
//   }
  
// }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookSharedService } from '../services/book-shared.service';
import { CartWishlistService } from '../services/cartwishlist.service';
import { CartService } from '../services/cart-service/cart.service';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.scss'],
})
export class ViewBookComponent implements OnInit {
  book: any;
  quantityToBuy: number = 1;
  isInWishlist: boolean = false;
  isInBag: boolean = false;

  constructor(
    private bookSharedService: BookSharedService,
    private cartWishlistService: CartWishlistService,
    private router: Router,
    private cartService: CartService
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
    const isLoggedIn = this.checkIfUserIsLoggedIn();
    if (isLoggedIn) {
      // Logged-in user: call backend API to add the book to the cart
      this.cartService.addBookToCart(`cart/${this.book._id}`, this.book).subscribe({
        next: (res: any) => {
          console.log('Book added to cart (Logged in):', res);
          this.isInBag = true;
        },
        error: (err: any) => {
          console.error('Error adding book to cart:', err.message);
        }
      });
    } else {
      // Logged-out user: Use CartWishlistService to add to local cart
      this.cartWishlistService.addToCart(this.book, this.quantityToBuy);
      this.isInBag = true;
      console.log('Book added to cart (Logged out):', this.book);
    }

    // For non-logged-in users: update the local cart
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

  // Helper method to check if the user is logged in
  checkIfUserIsLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }
}
