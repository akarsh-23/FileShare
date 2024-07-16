import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private meUrl = '/.auth/me';

  constructor(private http: HttpClient, private router: Router) {
  }

  getUserId():any {
    console.log("getting user id from auth.");
    const response = this.http.get<any>(this.meUrl);
    response.subscribe((authContract)=>{
      console.log(authContract.clientPrincipal.userId);
      return authContract.clientPrincipal.userId;
    })
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
