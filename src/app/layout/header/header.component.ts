import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/models/account';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: AccountService) { }

  currentUser: Account;

  ngOnInit() {
    this.userService.currentUser
      .subscribe(userData => {
        this.currentUser = userData;
      })
  }

}
