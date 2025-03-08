import { Routes } from '@angular/router';
import { RegisterComponent } from '../components/register/register.component';
import { HomeComponent } from '../components/home/home.component';
import { AboutComponent } from '../components/about/about.component';
import { LoginComponent } from '../components/login/login.component';
import { CourseComponent } from '../components/course/course.component';
import { AddCourseComponent } from '../components/add-course/add-course.component';
import { EditCourseComponent } from '../components/edit-course/edit-course.component';
import { AddLessonComponent } from '../components/add-lesson/add-lesson.component';
import { EditLessonComponent } from '../components/edit-lesson/edit-lesson.component';

export const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'course', component: CourseComponent },
    { path: 'home', component: HomeComponent },
    { path: 'contact', component:AboutComponent  },
    { path: 'addCourse', component: AddCourseComponent },
    { path: 'editCourse/:id', component: EditCourseComponent },
    { path: 'addLesson/:id', component: AddLessonComponent },
    { path: 'editLesson/:courseId/:lessonId', component: EditLessonComponent },
    { path: '', component: HomeComponent }
];
