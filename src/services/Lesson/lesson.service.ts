import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private apiUrl = ` http://localhost:3000/api/courses`;
  constructor(private http: HttpClient) { }

  getLessons(courseId: string): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/${courseId}/lessons`, { headers });
  }

  getLessonById(courseId: string, lessonId: string): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, { headers });
  }

  addLesson(title: string, content: string, courseId: string): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/${courseId}/lessons`, { title, content, courseId }, { headers });
  }

  updateLesson(courseId: string, lessonId: string, title: string, content: string): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, { title, content, courseId }, { headers });
  }

  deleteLesson(courseId: string, lessonId: string): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, { headers });
  }

}

