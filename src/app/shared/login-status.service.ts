import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginStatusService {

  constructor() { }
  
  private state$ = new BehaviorSubject<Boolean>(false);
  status=this.state$.asObservable();
  changeState(myChange) {
    console.log("change to:", myChange);
    this.state$.next(myChange);
  }
}
