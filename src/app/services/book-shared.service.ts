import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookSharedService {
  private bookList = new BehaviorSubject<any[]>([]);
  private selectedBook: any;

  constructor() {}
  setBookList(books: any[]): void {
    this.bookList.next(books);
  }

  getBookList(): Observable<any[]> {
    return this.bookList.asObservable();
  }

  setBook(book: any): void {
    this.selectedBook = book;
  }

  getBook(): any {
    return this.selectedBook;
  }
}


