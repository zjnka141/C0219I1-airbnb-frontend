import { Injectable } from '@angular/core';
import { Account } from "../models/account"
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, distinctUntilChanged } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // ,'Access-Control-Allow-Origin': 'http://localhost:4200'
};
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  registerUrl = "http://localhost:8080/register";
  private baseUrl = 'http://localhost:8080/accounts';


  registerUser(userInfo: Account): Observable<any> {
    return this.http.post<any>(this.registerUrl, userInfo, httpOptions);
  }

  updatePassword(id: number, newPassword: String, currentPassword: String): Observable<any> {
    return this.http.put(`${this.baseUrl}/update-password/${id}`, { newPassword: newPassword, currentPassword: currentPassword });
  }

  private currentUserSubject = new BehaviorSubject<Account>({} as Account);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  getCurrentUser(): Account {
    return this.currentUserSubject.value;
  }
}
