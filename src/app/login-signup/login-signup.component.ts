import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../services/user-service/user.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-login-signup',
  styleUrls: ['./login-signup.component.scss'],
  templateUrl: './login-signup.component.html',
})
export class LoginSignupComponent {
  loginForm!: FormGroup;
  signupForm!: FormGroup;
  submitted = false;
  isLoginForm = true;

  constructor(private fb: FormBuilder,private router: Router,private userService: UserService, private dialogRef: MatDialogRef<LoginSignupComponent>) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }


  get loginControls() {
    return this.loginForm.controls as { [key: string]: FormControl };
  }

  get signupControls() {
    return this.signupForm.controls as { [key: string]: FormControl };
  }

  handleLogin() {
    this.submitted = true;
    if (this.loginForm.valid) {
      console.log('Login Success');
      const {email, password} = this.loginForm.value;

      this.userService.loginSignUpAppiCall('users/signin', {
        email,
        password
      })
      .subscribe({
        next: (res:any)=>{
          console.log(res);
          localStorage.setItem('accessToken', res?.data?.generatedToken);
          this.dialogRef.close();
          // this.router.navigate(['/books']);
        },
        error: (err)=>{
          console.log(err);
        }
      })
    }
  }

  handleSignup() {
    this.submitted = true;
    if (this.signupForm.valid) {
      console.log('Signup Success');
      
    }
  }

  toggleForm(formType: 'login' | 'signup') {
    this.isLoginForm = formType === 'login';
    this.submitted = false;
  }
}

