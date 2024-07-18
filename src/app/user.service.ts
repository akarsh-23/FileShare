import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userURL = '/api/user';
  private user:any = undefined;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUser(): any {
    if(!this.user){
      this.authService.getAuthPrincipal().then((authPrincipal)=>{
        if(authPrincipal){
          this.http.get<any>(`${this.userURL}/${authPrincipal.clientPrincipal.userId}`).subscribe((user) => {
            if (user) {
              this.user = user;
              console.log(this.user);
              return user;
            } else {
              console.log("unable to get the user")
              return undefined;
            }
          });
        }else{
          console.log("Unable to fetch auth principal")
          return undefined;
        }
      })
    }else{
      return this.user;
    }
  }
}
