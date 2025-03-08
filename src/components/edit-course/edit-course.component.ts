import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseService } from '../../services/course/course.service';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-edit-course',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.css'
})
export class EditCourseComponent implements OnInit {
  courseForm!: FormGroup;
  submitted = false;
  errorMessage!: string;
  courseId!: string;
  constructor(private fb: FormBuilder, private courseService: CourseService, private authService: AuthService,
    private router: Router, private activatedRoute: ActivatedRoute) {
  }
  get formControls() {
    return this.courseForm.get('courseDetails') as FormGroup;
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.courseId = params['id'];
      this.initializeData()
    })
    this.initializeForm();
  }
  initializeData() {
    this.courseService.getCourseById(this.courseId).subscribe(
      course => {
        if (course) {
          this.courseForm.setValue({
            courseDetails: {
              title: course.title || '',
              description: course.description || ''
            }
          });
        }
      },
      error => {
        this.errorMessage = 'Error loading lesson details';
        alert(error);
      }
    );
  }
  initializeForm(): void {
    this.courseForm = this.fb.group({
      courseDetails: this.fb.group({
        title: ['', Validators.required],
        description: ['', [Validators.required, Validators.minLength(8)]],
      })
    })
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.courseForm.invalid) {
      return;
    }
    console.log('Submitted:', this.courseForm.value);
    const userIdString = this.authService.getUserId();
    const userId = userIdString ? +userIdString : -1;
    this.courseService.updateCourse(
      this.courseId,
      this.formControls.get('title')?.value,
      this.formControls.get('description')?.value,
      userId
    ).subscribe(
      response => {
        console.log("edit-course succesful")
        this.router.navigate(['/course']);
      },
      error => {
        this.errorMessage = error.error.message + 'Error editing the course, please try again.';
        alert(this.errorMessage);
      }
    );
  }
}
