// import { Component, OnInit } from '@angular/core';
// import { BookService } from '../services/book.service';
// @Component({
//   selector: 'app-book-list',
//   templateUrl: './book-list.component.html',
//   styleUrls: ['./book-list.component.scss']
// })
// export class BookListComponent implements OnInit {
//   books: any[] = [];
//   constructor(private bookService: BookService) { }

//   ngOnInit(): void {
//     this.bookService.getBooks().subscribe({
//       next: (data) => {
//         this.books = data.data;
//         console.log('Books fetched successfully:', this.books);
//       },
//       error: (error) => {
//         console.error('Error fetching books:', error);
//       }
//     });
//   }

// }


//Use above code 
import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book-service/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  books: any[] = [];

  constructor(private bookesService: BookService) {}

  ngOnInit(): void {
    this.loadBookes();
  }

  loadBookes(){
    this.bookesService.getBooksApiCall('books').subscribe({
      next: (res: any)=>{
        this.books = res.data;
      },
      error: (err)=>{
        console.log(err);
      },
    });
  }
}
