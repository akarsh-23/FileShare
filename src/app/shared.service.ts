import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private sidenavState = new BehaviorSubject<boolean>(false);
  sidenavState$ = this.sidenavState.asObservable();

  toggleSidenav() {
    this.sidenavState.next(!this.sidenavState.value);
  }
}
