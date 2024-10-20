import { Component, OnInit } from '@angular/core';
import { BookSharedService } from '../services/book-shared.service';
import { BookService } from '../services/book-service/book.service';
import { CartWishlistService } from '../services/cartwishlist.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit { 
  cartItems:any[] = []
  constructor(private bookService: BookService, private bookSharedService: BookSharedService, private cartWishlistService: CartWishlistService, private router: Router) {}

  ngOnInit(): void {
    this.cartWishlistService.getCart().subscribe((cart) => {
      this.cartItems = cart;
      console.log('Cart Items: ', this.cartItems);
    });
    
    //Commnted code 
    
    // this.bookService.getBooks().subscribe((books) => {
    //   this.bookSharedService.setBookList(books); 
    //   console.log("Books in navbar: ", books);
    // });
  }
  goToCart(): void {
    this.router.navigate(['/cart']);
  }
}
