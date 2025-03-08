import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { CourseService } from '../../services/course/course.service';
import { Course } from '../../moduls/Course';
import { LessonService } from '../../services/Lesson/lesson.service';
import { Lesson } from '../../moduls/Lesson';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [MatButtonModule,
    MatSelectModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatListModule
  ],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent implements OnInit {
  @Input() courseId!: string;
  @Output() lessonDeleted = new EventEmitter<void>();
  course?: Course;
  lessons: Lesson[] = [];
  userRole: any;

  constructor(
    private courseService: CourseService,
    private lessonServices: LessonService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    if (this.courseId) {
      this.loadCourseDetails();
      this.getLessons();
    }
  }

  loadCourseDetails(): void {
    this.courseService.getCourseById(this.courseId).subscribe(
      (course) => {
        this.course = course;
      },
      (error) => {
        alert('Error loading course details' + error);
      }
    );
  }
  getLessons() {
    this.lessonServices.getLessons(this.courseId).subscribe(
      (lessons) => {
        this.lessons = lessons;
      },
      (error) => {
        alert('Error get lessons' + error);
      }
    );
  }
  addLesson(): void {
    this.router.navigate(['/addLesson', this.courseId]);
  }
  deleteLesson(courseId: string, lessonId: string): void {
    this.lessonServices.deleteLesson(courseId, lessonId).subscribe(() => {
      this.lessonDeleted.emit();
      this.getLessons();
    }, (error) => {
      alert('Error delete lesson');
    }
    )
  }
  EditLesson(courseId: string, lessonId: string): void {
    this.router.navigate(['/editLesson', courseId, lessonId]);
  }
}
