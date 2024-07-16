import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private leftSidenavState = new BehaviorSubject<boolean>(false);
  leftSidenavState$ = this.leftSidenavState.asObservable();

  private rightSidenavState = new BehaviorSubject<boolean>(false);
  rightSidenavState$ = this.rightSidenavState.asObservable();

  toggleLeftSidenav() {
    this.leftSidenavState.next(!this.leftSidenavState.value);
  }
  toggleRightSidenav() {
    this.rightSidenavState.next(!this.rightSidenavState.value);
  }
}
