import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  errorMessage!: string;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }
  get formControls() {
    return this.registerForm.get('userDetails') as FormGroup;
  }
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      userDetails: this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        role: ['', Validators.required]
      })
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    console.log('Submitted:', this.registerForm.value);
    this.authService.register(
      this.formControls.get('name')?.value,
      this.formControls.get('email')?.value,
      this.formControls.get('password')?.value,
      this.formControls.get('role')?.value
    ).subscribe(
      response => {
        alert("register succesful 🤩😁😊")
        this.router.navigate(['/login']);
      },
      error => {
        this.errorMessage = error.error.message + 'Registration error, please try again.';
        alert(this.errorMessage);
      }
    );
  }
}
