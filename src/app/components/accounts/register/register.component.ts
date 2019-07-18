import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Account } from 'src/app/models/account';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide = true;

  genders = [
    "Male",
    "Female",
    "Other"
  ];

  validation_messages = {
    'fullName': [
      { type: 'required', message: 'Full Name is required' },
      { type: 'minlength', message: 'Full Name must be at least 5 characters long' },
      { type: 'maxlength', message: 'Full Name cannot be more than 25 characters long' },
      { type: 'pattern', message: 'Full Name no spaces please' }
    ],
    'username': [
      { type: 'required', message: 'User Name is required' },
      { type: 'minlength', message: 'Username must be at least 5 characters long' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long' },
    ],
    'age': [
      { type: 'required', message: 'Age is required' },
      { type: 'min', message: 'Renting a house over 18 years old' },
      { type: 'max', message: 'Under 70 years old for renting house' }
    ],
    'gender': [
      { type: 'required', message: 'Please select your gender' },
    ],
    'phone': [
      { type: 'required', message: 'Phone Number is required' },
      { type: 'pattern', message: 'Phone Number is only number' }
    ],
    'address': [
      { type: 'required', message: 'Address is required' },
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Please input correct email' },
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 5 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ],
  };

  form: any = {};
  userInfo: Account;
  isRegister = false;
  isRegisterFailed = false;
  errorMessage = '';

  constructor(private accountService: AccountService, private fb: FormBuilder, private router: Router, public snackbar: MatSnackBar) { }

  ngOnInit() {
    this.createFormRegister();
  }

  registerForm: FormGroup

  createFormRegister() {
    this.registerForm = this.fb.group({
      fullName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern(/^\S+.*\S+$/)
      ])),
      username: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.required
      ])),
      age: new FormControl('', Validators.compose([
        Validators.required,
        Validators.min(18),
        Validators.max(70)
      ])),
      gender: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      phone: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/^\+84\d{9,10}$/)
      ])),
      address: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
    })
  };

  onSubmitRegisters() {
    console.log(this.registerForm);

    this.userInfo = new Account(
      this.form.fullName,
      this.form.username,
      this.form.age,
      this.form.gender,
      this.form.phone,
      this.form.address,
      this.form.email,
      this.form.password
    );

    this.accountService.registerUser(this.userInfo)
      .subscribe(data => {
        if (this.userInfo == null) {
          this.isRegister = false;
        }
        this.isRegister = true;
        this.isRegisterFailed = false;
        const login = "Please Login";
        const snackbarRep = this.snackbar.open('Register Successfully!', login, {
          horizontalPosition: 'center',
        });
        console.log(data);
      },
        error => {
          this.errorMessage = error.error.message;
          this.isRegisterFailed = true;
          console.log(error);
        }
      )
  }

}
