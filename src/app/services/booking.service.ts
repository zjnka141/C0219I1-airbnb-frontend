import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../models/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private baseUrl = 'http://localhost:8080/booking';
  constructor(private http: HttpClient) { }

  createNewBooking(bookingInfo: Booking): Observable<any> {
    return this.http.post<any>(this.baseUrl, bookingInfo);
  }
  
}
