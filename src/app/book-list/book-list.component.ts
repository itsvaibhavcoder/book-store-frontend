import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books: any[] = [];
  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data.data;
        console.log('Books fetched successfully:', this.books);
      },
      error: (error) => {
        console.error('Error fetching books:', error);
      }
    });
  }

}

// import { Component, OnInit } from '@angular/core';
// import { BookSharedService } from '../services/book-shared.service';

// @Component({
//   selector: 'app-book-list',
//   templateUrl: './book-list.component.html',
//   styleUrls: ['./book-list.component.scss'],
// })
// export class BookListComponent implements OnInit {
//   books: any[] = [];

//   constructor(private bookSharedService: BookSharedService) {}

//   ngOnInit(): void {
//     // Fetch the book list from BookSharedService
//     this.books = this.bookSharedService.getBookList();
//   }
// }
