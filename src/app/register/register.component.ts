import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  Message: string = '';


  constructor(private fb: FormBuilder, private http: HttpClient,private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.http.post('http://localhost:8080/register', this.registerForm.value).subscribe({
        next: (response) => {
          this.Message = 'Rejestracja zakończona sukcesem!';
          console.log('Rejestracja udana', response);

        },
        error: (error) => {
          this.Message = 'Rejestracja nie powiodła się';
          console.error('Błąd rejestracji', error);
        }
      });
    }
    this.registerForm.reset();
  }

}
