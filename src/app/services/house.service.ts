import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  private baseUrl = 'http://localhost:8080/houses';
  constructor(private http: HttpClient) { }

  updateStatus(id: number, value: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateStatus/${id}`,value);
  }
  getHouseList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/list`);
  }
}
