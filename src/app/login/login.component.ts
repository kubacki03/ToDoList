import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {RegisterComponent} from '../register/register.component';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    NgIf,
    ReactiveFormsModule,
    RegisterComponent
  ]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient,private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }





  onSubmit() {
    if (this.loginForm.valid) {
      this.http.post('http://localhost:8080/login', this.loginForm.value, {responseType: 'text'}).subscribe({
        next: (response: string) => {
          console.log('Login successful, token:', response);
          // Store the JWT token in localStorage
          localStorage.setItem('jwtToken', response); // You can also use sessionStorage instead
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          this.errorMessage = 'Login failed';
          console.error('Login failed', error);
        }
      });
    }
  }
}
