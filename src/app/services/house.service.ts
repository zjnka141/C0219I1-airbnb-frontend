import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { House } from '../models/house';

@Injectable({
  providedIn: 'root'
})
export class HouseService {
  private size=10;
  private baseUrl = 'http://localhost:8080/houses';
  constructor(private http: HttpClient) { }

  updateStatus(id: number, value: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateStatus/${id}`, value);
  }

  getHouseList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/list`);
  }
  
  getHousePage(currentPage,size,search,min,max,numBed,typeBed):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}`,{params:{
      page:currentPage, size:size, search:search, min: min, max: max, numBed: numBed, typeBed: typeBed
    }});
  }

  createNewHouse(houseInfo: House): Observable<any> {
    return this.http.post<any>(this.baseUrl, houseInfo);
  }
  getHouseById(id: number) : Observable<any>{
    return this.http.get(`${this.baseUrl}/${id}`)
  }
}
