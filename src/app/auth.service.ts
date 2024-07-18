import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private meUrl = '/.auth/me';

  constructor(private http: HttpClient, private router: Router) {  }

  getAuthPrincipal():Promise<any> {
    return firstValueFrom(this.http.get<any>(this.meUrl));
  }

  login(){
    console.log("login")
    this.router.navigate(["/.auth/login/google"])
  }

  logout(){
    console.log("logout")
    this.router.navigate(["/.auth/logout"])
  }
}
