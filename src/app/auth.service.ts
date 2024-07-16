import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private meUrl = '/.auth/me';

  constructor(private http: HttpClient, private router: Router) {}

  getUser(): Observable<any> {
    console.log("getting user from auth.")
    return this.http.get<any>(this.meUrl);
  }

  login(){
    console.log("login")
    this.router.navigate(["./auth/login/google"])
  }

  logout(){
    console.log("logout")
    this.router.navigate(["./auth/logout"])
  }
}
