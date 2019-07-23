import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ChildActivationEnd } from "@angular/router";
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/models/account';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material';




@Component({
  selector: 'app-list-account',
  templateUrl: './list-account.component.html',
  styleUrls: ['./list-account.component.scss']
})
export class ListAccountComponent implements OnInit {

  displayedColumns = ['id', 'fullName', 'age', 'gender', 'phone', 'email', 'address', 'username', 'action'];
  DataSource: MatTableDataSource<Account>;
  public hidData = true;
  userData: any[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(private accountService: AccountService, private router: Router) {
    this.accountService.getAllAccounts().subscribe(users => {
      users.forEach(
        item => {
          let a = item.payload;
          console.log("A::::", item);
          this.userData.push(a as Account);
        })
      /* Data table */
      this.DataSource = new MatTableDataSource(this.userData);


    })
  }

  getAllAccount(): void {
    this.accountService.getAllAccounts().subscribe((res) => {
      this.hidData = false;
      this.userData = res;
      console.log(typeof (this.userData.length));
      console.log(this.userData.length);

      this.DataSource.data = this.userData;
      this.DataSource.paginator = this.paginator;
      this.DataSource.sort = this.sort;

    })
  }
  ngOnInit() {
    this.getAllAccount();
  }
  updateAccount(idAccount: Number) {
    console.log(idAccount);

    const id = idAccount.toString();
    localStorage.setItem("id", id);

    this.router.navigate(['update-user-information', id]);
  }

  public doFilter = (value: string) => {
    this.DataSource.filter = value.trim().toLocaleLowerCase();
  }

}
