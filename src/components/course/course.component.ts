import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course/course.service';
import { Course } from '../../moduls/Course';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth/auth.service';
import { CourseDetailsComponent } from '../course-details/course-details.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-course',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSelectModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    CourseDetailsComponent],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent implements OnInit {
  courses: Course[] = [];
  selectedCourseId?: string;
  userRole: any;
  constructor(private courseService: CourseService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe(
      (courses) => {
        this.courses = courses;
      },
      (error) => {
        alert('Error loading courses ' + error);
      }
    );
  }
  viewDetails(courseId: string): void {
    this.selectedCourseId = this.selectedCourseId === courseId ? undefined : courseId;
  }
  joinCourse(courseId: string): void {
    const userIdString = this.authService.getUserId();
    const userId = userIdString ? +userIdString : -1;
    this.courseService.enrollStudent(courseId, userId).subscribe(
      () => {
        alert('Joined course');
      },
      (error) => {
        alert('Error joining course,You have already registered');
      }
    );
  }

  leaveCourse(courseId: string): void {
    const userIdString = this.authService.getUserId();
    const userId = userIdString ? +userIdString : -1;
    this.courseService.unenrollStudent(courseId, userId).subscribe(
      () => {
        alert('Left course');
      },
      (error) => {
        alert('Error leaving course,You have already,You are not registered');
      }
    );
  }
  AddCourse(): void {
    this.router.navigate(['/addCourse']);
  }

  EditCourse(course: Course): void {
    this.router.navigate(['/editCourse', course.id]);
  }

  deleteCourse(courseId: string): void {
    this.courseService.deleteCourse(courseId).subscribe(() => {
      console.log('Course deleted');
      this.loadCourses();
    }, (error) => {
      alert('Error delete course');
    }

    );
  }
  onLessonDeleted() {
    alert("lesson delete")
  }
}
