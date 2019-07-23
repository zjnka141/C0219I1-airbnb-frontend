import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {}

  url : string = "http://localhost:8080/customers";

  getAllCustomers():Observable<any>{
    return this.http.get(this.url);
  }

  getCustomerById(id :number){
    return this.http.get<Customer>(this.url + '/' + id);
  }

  deleteCustomer(id:number){
    return this.http.delete(this.url + '/' + id);
  }
}
