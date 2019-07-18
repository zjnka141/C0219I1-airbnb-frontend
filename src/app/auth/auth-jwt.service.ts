import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtResponse } from './jwt-response';
import { AuthLoginInfo } from './login-info';
import { RegisterInfo } from './register-info';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // ,'Access-Control-Allow-Origin': 'http://localhost:4200'
};
@Injectable({
  providedIn: 'root'
})
<<<<<<< HEAD:src/app/auth/auth.service.ts
export class AuthService {
  loginUrl = "http://localhost:8080/login";
=======
export class AuthJwtService {
  loginUrl="http://localhost:8080/login"
>>>>>>> master:src/app/auth/auth-jwt.service.ts
  constructor(private http: HttpClient) { }
  attemptAuth(userinfo: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, userinfo, httpOptions);
  }

  registerUrl = "http://localhost:8080/register";

  registerUser(userInfo: RegisterInfo): Observable<any> {
    return this.http.post<any>(this.registerUrl, userInfo, httpOptions);
  }
}
