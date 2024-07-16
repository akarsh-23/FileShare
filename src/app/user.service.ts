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
  user_id:any;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUser(): Observable<any> {
    this.authService.getUser().subscribe((user)=>{
      if(user){
        console.log(user)
        this.user_id = user.clientPrincipal.userId;
      }
    })
    return this.http.get<any>(`${this.userURL}/${this.user_id}`);
  }
}
