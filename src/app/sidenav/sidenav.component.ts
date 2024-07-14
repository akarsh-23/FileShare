import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSidenavModule
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit  {

  @ViewChild('drawer') drawer!: MatSidenav;

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void{
    this.sharedService.sidenavState$.subscribe((state: boolean) => {
      if (state) {
        this.drawer.open();
      } else {
        this.drawer.close();
      }
    });
  }
}
