import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LessonService } from '../../services/Lesson/lesson.service';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-add-lesson',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './add-lesson.component.html',
  styleUrl: './add-lesson.component.css'
})
export class AddLessonComponent implements OnInit {
  lessonForm!: FormGroup;
  submitted = false;
  courseId!: string;
  errorMessage!: string;
  constructor(private fb: FormBuilder, private lessonService: LessonService, private router: Router
    , private activatedRoute: ActivatedRoute) {
  }
  get formControls() {
    return this.lessonForm.get('lessonDetails') as FormGroup;
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.courseId = params['id'];
    })
    this.initializeForm();
  }
  initializeForm() {
    this.lessonForm = this.fb.group({
      lessonDetails: this.fb.group({
        title: ['', Validators.required],
        content: ['', [Validators.required, Validators.minLength(8)]],
      })
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.lessonForm.invalid) {
      return;
    }
    console.log('Submitted:', this.lessonForm.value);
    this.lessonService.addLesson(
      this.formControls.get('title')?.value,
      this.formControls.get('content')?.value,
      this.courseId
    ).subscribe(
      response => {
        console.log("add-lesson succesful")
        this.router.navigate(['/course']);
      },
      error => {
        this.errorMessage = error.error.message + 'Error adding, please try again.';
        alert(this.errorMessage)
      }
    );
  }
}
