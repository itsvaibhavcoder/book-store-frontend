import { Component, OnInit } from '@angular/core';
import { CartWishlistService } from '../services/cartwishlist.service';
import { BookSharedService } from '../services/book-shared.service';
import { CartService } from '../services/cart-service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
   book: any;
  // For logged-in user
  cartItemsList: any[] = [];
  cartBooks: any[] = [];

  // For non-logged-in user
  cartItems: any[] = [];
  booksInCart: any[] = [];

  quantityToBuy: number = 1;

  // UI toggles
  isCartVisible: boolean = true;
  isCustomerDetailsVisible: boolean = false;
  isOrderSummaryVisible: boolean = false;

  isWorkAddressSelected: boolean = false;
  isHomeAddressSelected: boolean = false;

  constructor(
    private cartWishlistService: CartWishlistService,
    private bookSharedService: BookSharedService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.book = this.bookSharedService.getBook();
    const isLoggedIn = this.checkIfUserIsLoggedIn();
    
    if (isLoggedIn) {
      this.loadCartItemsFromBackend();
    } else {
      this.loadCartItemsFromWishlist();
    }
  }

  checkIfUserIsLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  // Load items from the backend for logged-in users
  loadCartItemsFromBackend(): void {
    this.cartService.getAllItemsFromCart('cart').subscribe({
      next: (res: any) => {
        console.log('Full Cart API Response (Logged in):', res);
        this.cartItemsList = res.data.books;
        console.log('Cart Items list (Logged in):', this.cartItemsList);

        // Fetch the complete book list and filter the cart items
        this.bookSharedService.getBookList().subscribe((books) => {
          console.log('Full Books List:', books);
          this.cartBooks = books.filter((book) =>
            this.cartItemsList.some((cartItem) => cartItem._id === book._id)
          );
          console.log('Cart Books (Logged in):', this.cartBooks);
        });
      },
      error: (err) => {
        console.log('Error fetching cart items (Logged in):', err);
      },
    });
  }

  // Load items from CartWishlistService for non-logged-in users
  loadCartItemsFromWishlist(): void {
    this.cartWishlistService.getCart().subscribe((cart) => {
      this.cartItems = cart;
      console.log('Cart Items (Non-logged in):', this.cartItems);

      // Fetch the complete book list and filter the cart items
      this.bookSharedService.getBookList().subscribe((books) => {
        console.log('booklist-->', books);
        this.booksInCart = books.filter((book) =>
          this.cartItems.some((cartItem) => cartItem._id === book._id)
        );
        console.log('Books in Cart (Non-logged in):', this.booksInCart);
      });
    });
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

  // Toggle address details
  toggleAddressDetails(item: any) {
    item.showAddressDetails = !item.showAddressDetails;
  }

  //UI toggles
  toggleCart(): void {
    this.isCartVisible = !this.isCartVisible;
  }

  toggleCustomerDetails(): void {
    this.isCustomerDetailsVisible = !this.isCustomerDetailsVisible;
  }

  toggleOrderSummary(): void {
    this.isOrderSummaryVisible = !this.isOrderSummaryVisible;
  }

  updateQuantity(action: 'add' | 'remove', id: number): void {
    console.log(`Updating quantity for item with ID ${id}, action: ${action}`);
  }
  removeItem(id: number): void {
    console.log(`Removing item with ID ${id}`);
  }

  placeOrder(): void {
    console.log('Placing order...');
    this.toggleCart();
    this.toggleCustomerDetails();
  }

  continueToSummary(): void {
    console.log('Continuing to order summary...');
    this.toggleCustomerDetails();
    this.toggleOrderSummary();
  }

  checkout(): void {
    console.log('Checking out...');
    alert('Checkout complete!');
  }
}
