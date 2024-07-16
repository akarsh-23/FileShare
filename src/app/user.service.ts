import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userURL = '/user';

  constructor(private http: HttpClient) {}

  getUser(user_id:any): Observable<any> {
    return this.http.get<any>(`${this.userURL}/${user_id}`);
  }
}
