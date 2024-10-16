import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BookSharedService } from '../services/book-shared.service';
@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent implements OnInit {
  @Input() book: any;
  constructor(private router: Router,private bookSharedService: BookSharedService ) {}

  ngOnInit(): void {}
  navigateToBookDetail(): void {
    this.bookSharedService.setBook(this.book);
    this.router.navigate(['/view-book', this.book._id]);
  }
}
