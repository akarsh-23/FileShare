import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import { SharedService } from '../shared.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private sharedService: SharedService) {}
  leftSidenavstate = false;
  rightSidenavstate = false;

  toggleLeftSidenav() {
    this.sharedService.toggleLeftSidenav();
    this.leftSidenavstate = !this.leftSidenavstate;
  }
  toggleRightSidenav() {
    this.sharedService.toggleRightSidenav();
    this.rightSidenavstate = !this.rightSidenavstate;
  }
}
