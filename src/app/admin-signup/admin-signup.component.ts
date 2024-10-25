import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../services/user-service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-signup',
  templateUrl: './admin-signup.component.html',
  styleUrls: ['./admin-signup.component.scss']
})
export class AdminSignupComponent implements OnInit {
  signupForm!: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder,private router: Router,private userService: UserService) { 
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  get signupControls() {
    return this.signupForm.controls as { [key: string]: FormControl };
  }

  handleSignup() {
    this.submitted = true;
    if (this.signupForm.valid) {
      const {firstName, lastName, email,password } = this.signupForm.value;
      this.userService.loginSignUpAppiCall('users/adminsignup',{
        firstName, lastName, email, password
      })
      .subscribe({
        next: (res)=>{
          console.log(res);
        },
        error: (err)=>{
          console.log(err)
        }
      })
    }
  }

}
