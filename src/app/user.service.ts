import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userURL = '/api/user';
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUser(): any {
    this.authService.getAuthPrincipal().then((authPrincipal) => {
      if (authPrincipal) {
        this.http.get<any>(`${this.userURL}/${authPrincipal.clientPrincipal.userId}`).pipe(
          tap((user) => {
            if (user) {
              this.userSubject.next(user);
            } else {
              console.log("Unable to get the user");
            }
          })
        ).subscribe();
      } else {
        console.log("Unable to fetch auth principal");
      }
    });
    return this.user$;
  }
}
