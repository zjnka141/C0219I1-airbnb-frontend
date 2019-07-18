import { Injectable } from '@angular/core';
import { Account } from "../models/account"
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  registerUser(userInfo: Account): Observable<any> {
    return this.http.post<any>(this.registerUrl, userInfo, httpOptions);
  }
}
