import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl = 'http://localhost:8080/accounts';
  constructor(private http: HttpClient) { }

  updatePassword(id: number, newPassword: String, currentPassword: String): Observable<any> {
    return this.http.put(`${this.baseUrl}/update-password/${id}`, { newPassword: newPassword, currentPassword: currentPassword });
  }
}
