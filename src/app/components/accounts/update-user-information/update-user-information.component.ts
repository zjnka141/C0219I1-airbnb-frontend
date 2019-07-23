import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { AccountService } from 'src/app/services/account.service';

import { Location } from '@angular/common';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';

@Component({
  selector: 'app-update-user-information',
  templateUrl: './update-user-information.component.html',
  styleUrls: ['./update-user-information.component.scss']
})
export class UpdateUserInformationComponent implements OnInit {
  submitted = false;
  // editForm: FormGroup;


  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  @ViewChild('chipList', { static: true }) chipList;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  editAccountForm: FormGroup;


  constructor(private router: Router,
    public fb: FormBuilder,
    private accountService: AccountService,
    private actRoute: ActivatedRoute,
    private location: Location,
  ) {
    var accountId = localStorage.getItem("id");

    const id = +accountId;
    this.accountService.getAccountById(id).subscribe(data => {
      this.editAccountForm.patchValue(data)
    })
  }

  ngOnInit() {
    console.log("ID::::::::::::::::"+localStorage.getItem("id"));
    this.updateAccountForm();
  }

  /* Update form */
  updateAccountForm() {
    this.editAccountForm = this.fb.group({
      id:[],
      fullName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+(([,. -][a-zA-Z ])?[a-zA-Z]*)*$')]],
      age: [, [Validators.required, Validators.min(18), Validators.max(70)]],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[0]\\d{9}')]],
      address: ['', [Validators.required]],
      username: [''],
      password: [''],
    })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.editAccountForm.controls[controlName].hasError(errorName);
  }
  /* Go to previous page */
  goBack() {
    this.location.back();
  }

  /* Submit book */
  updateAccount() {
    if (this.editAccountForm.valid && window.confirm('Are you sure you wanna update?')) {
           this.accountService.updateUserInformation(this.editAccountForm.value)
             .subscribe(data => {
               console.log(this.editAccountForm.value);
              console.log(data.toString());
              this.router.navigate(['list-account']);
              alert("Update User Information successfully!")
            });
         }
    // if (window.confirm('Are you sure you wanna update?')) {
    //   let account = this.accountService.getAccountById(id).subscribe(data => {
    //     this.editAccountForm.setValue(data);
    //   });
    //   this.accountService.updateUserInformation(this.editAccountForm.value);
    //   this.router.navigate(['list-account']);
    // }
  }
  // ngOnInit() {
  //   var accountId = localStorage.getItem("id");

  //   this.editForm = this.formBuilder.group({
  //     id: [],
  //     fullName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+(([,. -][a-zA-Z ])?[a-zA-Z]*)*$')]],
  //     age: [, [Validators.required, Validators.min(18), Validators.max(70)]],
  //     gender: ['', Validators.required],
  //     phone: ['', [Validators.required, Validators.pattern('[0]\\d{9}')]],
  //     email: ['', [Validators.required, Validators.email]],
  //     address: ['', Validators.required],
  //   });

  //   const id = +accountId;
  //   this.accountService.getAccountById(id).subscribe(data => {
  //     this.editForm.patchValue(data);
  //   });
  // }

  // get f() { return this.editForm.controls }


  // onSubmit() {
  //   this.submitted = true;
  //   console.log(this.editForm.value);
  //   if (this.editForm.valid) {
  //     this.accountService.updateUserInformation(this.editForm.value)
  //       .subscribe(data => {
  //         console.log(data);
  //         this.router.navigate(['']);
  //         alert("Update User Information successfully!")
  //       });
  //   }
  // }
}
