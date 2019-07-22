import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { House } from '../models/house';

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  private baseUrl = 'http://localhost:8080/houses';
  constructor(private http: HttpClient) { }

  updateStatus(id: number, value: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateStatus/${id}`, value);
  }
  getHouseList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/list`);
  }

  createNewHouse(houseInfo: House): Observable<any> {
    return this.http.post<any>(this.baseUrl, houseInfo);
  }
}
