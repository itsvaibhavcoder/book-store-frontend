import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookSharedService {
  private selectedBook: any;

  constructor() {}

  setBook(book: any): void {
    this.selectedBook = book;
  }

  getBook(): any {
    return this.selectedBook;
  }
}
