import { Injectable } from '@angular/core';
import { HttpServiceService } from '../http-service/http-service.service';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  constructor(private http: HttpServiceService) { }
  
  //Get all items from books
  getAllItemsFromCart(endPoint: string){
   return this.http.getApiCall(endPoint)
  }

  //It required token (user should logged in)
  addBookToCart(endPoint: string, book: any){
    return this.http.postApiCall(endPoint, book)
  }
  
  //Increase Quantity 
  increaseQuantity(endPoint:string){
    
  }

  decreaseQauntity(endPoint:string){

  }

  removeItemFromCart(endPoint:string){
     return this.http.deleteApiCall(endPoint)
  }

}
