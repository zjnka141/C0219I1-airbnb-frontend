import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import { Router } from "@angular/router";
import { CustomerService } from 'src/app/services/customer.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';




@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {
    // customers: Observable<Customer>;
     modalRef: BsModalRef;
    // searchText;

  
  displayedColumns = ['id','tenant','hire_date','house_type','house_address','price', 'action'];
  DataSource: MatTableDataSource<Customer>;
  public hidData = true;
  customerData: any[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;



  constructor(private customerService: CustomerService, private router: Router,private modalService: BsModalService) {
    this.customerService.getAllCustomers().subscribe(customers => {
      customers.forEach(
        item => {
          let a = item.payload;
          console.log("A::::", item);
          this.customerData.push(a as Customer);
        })
      /* Data table */
      this.DataSource = new MatTableDataSource(this.customerData);


    })
  }
  // order = "tenant";
  // reverse = false;

  ngOnInit() {
    this.getAllCustomers();
  }

  getAllCustomers(): void {
    this.customerService.getAllCustomers().subscribe((res) => {
      this.hidData = false;
      this.customerData = res;
      console.log(typeof (this.customerData.length));
      console.log(this.customerData.length);

      this.DataSource.data = this.customerData;
      this.DataSource.paginator = this.paginator;
      this.DataSource.sort = this.sort;

    })
  }

  deleteCustomer(customer: Customer) {
    this.customerService.deleteCustomer(customer.id).subscribe(data => {
      alert("You have successfully deleted!")
      this.getAllCustomers();
    });
  }

  SubtractionDate(customer: Customer) {
    let hire_date = customer.hire_date;

    let date_now = Date.now();

    let _hire_date = new Date(hire_date).getTime();

    let sub_date = date_now - _hire_date;

    if (sub_date <= 86400000) {
      alert("You have booked less than 1 day. So you must not cancel!")
    } else {
      this.deleteCustomer(customer);
    }

  }

  openModal1(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  decline(): void {
    this.modalRef.hide();
  }
  public doFilter = (value: string) => {
    this.DataSource.filter = value.trim().toLocaleLowerCase();
  }
}
