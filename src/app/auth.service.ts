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
    this.getAuthPrincipal().then((authPrincipal) => {
      this.user_id = authPrincipal.clientPrincipal.userId;
    })
  }

  async getAuthPrincipal():Promise<any> {
    return await this.http.get<any>(this.meUrl);
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
