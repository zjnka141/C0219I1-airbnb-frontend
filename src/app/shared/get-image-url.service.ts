import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetImageUrlService {

  constructor() { }
  
  private state$ = new BehaviorSubject<Array<String>>([]);
  url=this.state$.asObservable();
  updateUrl(myChange) {
    console.log("change to:", myChange);
    this.state$.next(myChange);
  }
}
