import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookSharedService } from '../services/book-shared.service';
@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.scss']
})
export class ViewBookComponent implements OnInit {
  book: any;
  constructor(private bookSharedService: BookSharedService, private router: Router) { }

  ngOnInit(): void {
    this.book = this.bookSharedService.getBook();
    if (!this.book) {
      console.error('No book found');
      this.router.navigate(['/books']); 
    }
  }
}
