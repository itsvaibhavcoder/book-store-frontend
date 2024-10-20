// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// @Injectable({
//   providedIn: 'root'
// })

// export class BookService {
//   private apiUrl = 'http://localhost:5000/api/v1/books';
//   constructor(private http: HttpClient) { }

//   getBooks(): Observable<any>{
//     return this.http.get<any>(this.apiUrl)
//   }
// }


//If error occured use above code
import { Injectable } from '@angular/core';
import { HttpServiceService } from '../http-service/http-service.service';
@Injectable({
  providedIn: 'root'
})

export class BookService {

  constructor(private http: HttpServiceService) { }
  
  getBooksApiCall(endPoint: string){
    return this.http.getApiCall(endPoint);
  }
 
  // addBookApiCall(endPoint:string, bookData: any){
  //   return this.http.postApiCall(endPoint, bookData, true);
  // }
  
  //without header
  addBookApiCall(endPoint:string, bookData: any){
    return this.http.postApiCall(endPoint, bookData);
  }

  deleteBookById(endPoint: string, bookId: string){
    return this.http.deleteApiCall(`${endPoint}/${bookId}`);
  }

  updateBookById(endPoint:string, bookId: string, updatedData: any){
    return this.http.putApiCall(`${endPoint}/${bookId}`, updatedData);
  }

}





