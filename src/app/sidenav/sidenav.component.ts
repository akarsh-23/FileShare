import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import { SharedService } from '../shared.service';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../auth.service';
import { error } from 'console';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSidenavModule,
    MatIconModule
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit  {
  user:any;

  @ViewChild('leftdrawer') leftdrawer!: MatSidenav;
  @ViewChild('rightdrawer') rightdrawer!: MatSidenav;

  constructor(private sharedService: SharedService, private authService: AuthService, private userService: UserService) {}

  ngOnInit(): void{
    this.userService.getUser().subscribe((user) => {
      if (user) {
        this.user = user
        console.log(user)
      } else {
        console.log("unable to get the user")
      }
    });

    this.sharedService.leftSidenavState$.subscribe((state: boolean) => {
      if (state) {
        this.leftdrawer.open();
      } else {
        this.leftdrawer.close();
      }
    });

    this.sharedService.rightSidenavState$.subscribe((state: boolean) => {
      if (state) {
        this.rightdrawer.open();
      } else {
        this.rightdrawer.close();
      }
    });
  }

  login(){
    this.authService.login()
  }

  logout(){
    this.authService.logout()
  }
}
