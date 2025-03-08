import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/auth';
  private userId: string | null = null;
  private userRole: string | null = null;
  constructor(private http: HttpClient) { }

  register(name: string, email: string, password: string, role: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { name, email, password, role });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  storeToken(token: string) {

    sessionStorage.setItem('token', token);

  }
  storeUserId(userId: string): void {
    this.userId = userId;
    localStorage.setItem('userId', userId);
  }

  getUserId(): string | null {
    return localStorage.getItem('userId')
  }

  storeUserRole(userRole: string): void {
    this.userRole = userRole;
    localStorage.setItem('userRole', userRole);
  }

  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }


}
