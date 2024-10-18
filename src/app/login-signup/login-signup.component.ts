import { Component } from '@angular/core';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss'],
})
export class LoginSignupComponent {
  isLoginForm = true; 

  toggleForm(formType: string): void {
    this.isLoginForm = formType === 'login';
  }
}
