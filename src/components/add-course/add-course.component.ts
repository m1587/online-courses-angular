import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseService } from '../../services/course/course.service';
import { AuthService } from '../../services/auth/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent implements OnInit {
  courseForm!: FormGroup;
  submitted = false;
  errorMessage!: string;
  constructor(private fb: FormBuilder, private courseService: CourseService, private authService: AuthService, private router: Router) {
  }
  get formControls() {
    return this.courseForm.get('courseDetails') as FormGroup;
  }
  ngOnInit(): void {
    this.courseForm = this.fb.group({
      courseDetails: this.fb.group({
        title: ['', Validators.required],
        description: ['', [Validators.required, Validators.minLength(8)]],
      })
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.courseForm.invalid) {
      return;
    }
    console.log('Submitted:', this.courseForm.value);
    const userIdString = this.authService.getUserId();
    const userId = userIdString ? +userIdString : -1;
    this.courseService.addCourse(
      this.formControls.get('title')?.value,
      this.formControls.get('description')?.value,
      userId
    ).subscribe(
      response => {
        this.router.navigate(['/course']);
      },
      error => {
        this.errorMessage = error.error.message + 'Error adding, please try again.';
        alert(this.errorMessage)
      }
    );
  }
}
