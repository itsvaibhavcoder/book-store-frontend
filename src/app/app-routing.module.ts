import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { ViewBookComponent } from './view-book/view-book.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'login-signup', component: LoginSignupComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'cart', component: CartComponent},
  { path: 'books', component: BookListComponent },
  { path: 'view-book/:id', component: ViewBookComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
