import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private meUrl = '/.auth/me';
  private user_id:any;

  constructor(private http: HttpClient, private router: Router) {
    this.getAuthPrincipal().subscribe((authPrincipal)=>{
      this.user_id = authPrincipal.clientPrincipal.userId;
    })
  }

  getAuthPrincipal():Observable<any> {
    return this.http.get<any>(this.meUrl);
  }

  getUserId(): any{
    return this.user_id
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
