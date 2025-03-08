import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService } from '../../services/Lesson/lesson.service';
@Component({
  selector: 'app-edit-lesson',
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
  templateUrl: './edit-lesson.component.html',
  styleUrl: './edit-lesson.component.css'
})
export class EditLessonComponent implements OnInit {
  lessonForm!: FormGroup;
  submitted = false;
  errorMessage!: string;
  courseId!: string;
  lessonId!: string;
  route: any;
  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private lessonService: LessonService, private router: Router) { }
  get formControls() {
    return this.lessonForm.get('lessonDetails') as FormGroup;
  }
  ngOnInit(): void {
    this.initializeForm();
    this.activatedRoute.params.subscribe(params => {
      this.courseId = params['courseId'];
      this.lessonId = params['lessonId'];
    });
    this.initializeData();
    this.initializeForm();
  }
  initializeData() {
    this.lessonService.getLessonById(this.courseId, this.lessonId).subscribe(
      lesson => {
        if (lesson) {
          this.lessonForm.setValue({
            lessonDetails: {
              title: lesson.title || '',
              content: lesson.content || ''
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
    this.lessonForm = this.fb.group({
      lessonDetails: this.fb.group({
        title: ['', Validators.required],
        content: ['', [Validators.required, Validators.minLength(8)]],
      })
    })
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.lessonForm.invalid) {
      return;
    }
    console.log('Submitted:', this.lessonForm.value);
    this.lessonService.updateLesson(
      this.courseId,
      this.lessonId,
      this.formControls.get('title')?.value,
      this.formControls.get('content')?.value,
    ).subscribe(
      response => {
        console.log("edit-lessson succesful")
        this.router.navigate(['/course']);
      },
      error => {
        this.errorMessage = error.error.message || 'Error editing lesson, please try again.';
        alert(this.errorMessage)
      }
    );
  }
}
