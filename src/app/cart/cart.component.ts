import { Component, OnInit } from '@angular/core';
import { CartWishlistService } from '../services/cartwishlist.service';
import { BookSharedService } from '../services/book-shared.service';
import { CartService } from '../services/cart-service/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginSignupComponent } from '../login-signup/login-signup.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  book: any;
  cartBooks: any[] = []; 
  quantityToBuy: number = 1;
  isCartVisible: boolean = true;
  isCustomerDetailsVisible: boolean = false;
  isOrderSummaryVisible: boolean = false;

  isWorkAddressSelected: boolean = false;
  isHomeAddressSelected: boolean = false;
  constructor(
    private cartWishlistService: CartWishlistService,
    private bookSharedService: BookSharedService,
    private cartService: CartService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    //current cart list (cartwishlist)---> subscribe --->store in cartBooks
    this.bookSharedService.getBook().subscribe((book) => {
      this.book = book;
    })
      
    const isLoggedIn = this.checkIfUserIsLoggedIn();
    
    //Data always from cureent cart list (remove it)
    if (isLoggedIn) {
      this.loadCartItemsFromBackend();  // Load from backend for logged-in users
    } else {
      this.loadCartItemsFromWishlist();  // Load from local storage for logged-out users
    }
  }

  checkIfUserIsLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  // Load cart items from the backend for logged-in users
  loadCartItemsFromBackend(): void {
    this.cartService.getAllItemsFromCart('cart').subscribe({
      next: (res: any) => {
        console.log('Full Cart API Response (Logged in):', res);
        this.cartBooks = res.data.books; // Unified cartBooks list
        console.log('Cart Items (Logged in):', this.cartBooks);
      },
      error: (err) => {
        console.log('Error fetching cart items (Logged in):', err);
      }
    });
  }

  // Load cart items from the CartWishlistService for non-logged-in users
  loadCartItemsFromWishlist(): void {
    this.cartWishlistService.getCart().subscribe((cart) => {
      this.cartBooks = cart; // Unified cartBooks list for non-logged-in users
      console.log('Cart Items (Non-logged in):', this.cartBooks);

      // Optionally, if you want to show detailed book information, load full book details
      this.bookSharedService.getBookList().subscribe((books) => {
        console.log('Book list:', books);

        // Populate the cart with detailed book info for non-logged-in users
        this.cartBooks = books.filter((book) =>
          this.cartBooks.some((cartItem) => cartItem._id === book._id)
        );
        console.log('Books in Cart (Non-logged in):', this.cartBooks);
      });
    });
  }

  //Fetch and merge items after user logs in
  loadCartItemsFromBackendAfterLogin(): void {
    this.cartService.getAllItemsFromCart('cart').subscribe({
      next: (backendRes: any) => {
        const backendCartItems = backendRes.data.books;

        // Get local cart and merge with backend
        const mergedCart = this.mergeCartItems(backendCartItems, this.cartBooks);
        console.log('Merged Cart:', mergedCart);
         
        this.cartBooks = mergedCart; // Update unified cartBooks list
        //merge send data cart wishlist 
      },
      error: (err) => {
        console.log('Error fetching cart items from backend:', err);
      }
    });
  }

  //Merge backend and local cart items(Improve merge conditions)
  mergeCartItems(backendCart: any[], localCart: any[]): any[] {
    const mergedCart = [...backendCart];

    localCart.forEach((localItem) => {
      const backendItem = mergedCart.find(item => item._id === localItem._id);
      if (backendItem) {
        backendItem.quantity += localItem.quantity; // Merge quantities
      } else {
        mergedCart.push(localItem);  // Add local-only items
      }
    });

    return mergedCart;
  }


  //Open login dialog
  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginSignupComponent, { width: '700px' });
    
    dialogRef.afterClosed().subscribe(() => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        this.loadCartItemsFromBackendAfterLogin(); // Reload cart after login
      }
    });
  }
  
  //Actual backend call
  incrementCartQuantityInCart(bookId: string):void{
    if(localStorage.getItem('accessToken')){
      this.cartService.increaseQuantity(`cart/increase/${bookId}`).subscribe({
        next: (res:any)=>{
          console.log('Quantity increased:', res);
          this.loadCartItemsFromBackend();
        },
        error: (err) => {
          console.error('Error increasing quantity:', err);
        }
      });
    }
    //Cart service without condition always
    //Decrement same 
    //Remove same
  }

  //Actual backend call
  decrementQauntityInCart(bookId: string): void {
    this.cartService.decreaseQauntity(`cart/${bookId}`).subscribe({
      next: (res:any) => {
        console.log('Quantity decreased:', res);
        this.loadCartItemsFromBackend(); // Reload the cart to reflect changes
      },
      error: (err:any) => {
        console.error('Error decreasing quantity:', err);
      }
    });
  }

  //Remove item from cart
  removeItemFromCart(bookId: string):void{
   this.cartService.removeItemFromCart(`cart/${bookId}`).subscribe({
    next: (res)=>{
      console.log('Item removed:', res);
      this.loadCartItemsFromBackend();
    },
    error: (err)=>{
      console.error('Error removing item:', err);
    }
   });
  }
  
  //For non logged in user
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

  //Using cartwishlist service for non-logged in user
  removeItem(): void {
    //this.cartWishlistService.removeFromCart(this.book._id);
  }
  
  // //actual backend api call
  // removeItemFromCart(): void {
  //  // this.cartService.removeItemFromCart(`cart/${this.book._id}`)
  // }

  //Toggle address details
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

  placeOrder(): void {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      //User is logged in
      this.toggleCustomerDetails();
    } else {
      this.openLoginDialog();
    }
  }

}