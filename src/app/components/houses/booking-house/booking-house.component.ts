import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { Booking } from 'src/app/models/booking';
import { BookingService } from 'src/app/services/booking.service';
import { HouseService } from 'src/app/services/house.service';

@Component({
  selector: 'app-booking-house',
  templateUrl: './booking-house.component.html',
  styleUrls: ['./booking-house.component.scss']
})

export class BookingHouseComponent implements OnInit {
  registerForm: FormGroup;
  form: any = {};
  genders = ["Male", "Female", "Other"];
  relationships = ["Người thân","Bạn bè", "Khác"];
  booking: Booking;
  dateNow: Date = new Date();

  constructor(private fb: FormBuilder, private router: Router, private bookingService: BookingService, private houseService: HouseService) { }

  validation_messages = {
    'fullName': [
      { type: 'required', message: 'Full Name is required' },
      { type: 'minlength', message: 'Full Name must be at least 5 characters long' },
      { type: 'maxlength', message: 'Full Name cannot be more than 25 characters long' },
      { type: 'pattern', message: 'Full Name no spaces please' }
    ],
    'birthday': [
      { type: 'required', message: 'birthday is required' },
    ],
    'gender': [
      { type: 'required', message: 'Please select your gender' },
    ],
    'phone': [
      { type: 'required', message: 'Phone Number is required' },
      { type: 'pattern', message: 'Phone Number is only number' }
    ],
    'checkIn': [
      { type: 'required', message: 'Check In Date is required' },
    ],
    'checkOut': [
      { type: 'required', message: 'Check Out Date is required' },
    ],
    'relationship': [
      { type: 'required', message: 'Relationship is required' }
    ],
    'amount': [
      { type: 'required', message: 'Amount is required' },
      { type: 'pattern', message: 'Amount is only one number' }
    ],
    'descriptionBookingHouse': [
      { type: 'required', message: 'DesciptionBookingHouse is required' }
    ]
  };

  ngOnInit() {
    this.createForm();

  }
  createForm() {
    this.registerForm = this.fb.group({
      fullName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern(/^\S+.*\S+$/)
      ])),
      birthday: new FormControl('', Validators.compose([
        Validators.required,
        Validators.min(18),
        Validators.max(70)
      ])),
      gender: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      phone: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/^0\d{9,10}$/),
      ])),
      address: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      checkIn: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      checkOut: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      relationship: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      amount: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/^\d{1}$/),
      ])),
      desciptionBookingHouse: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    })
  }
  onSubmitRegisters() {
    if (this.registerForm.valid) {
      this.booking = new Booking(
        this.form.fullName,
        this.form.birthday,
        this.form.gender,
        this.form.phone,
        this.form.relationship,
        this.form.checkIn,
        this.form.checkOut,
        this.form.amount,
        this.form.desciptionBookingHouse
      );
      this.bookingService.createNewBooking(this.booking).subscribe(res => {
        alert("Đặt nhà thành công")
      })
    }
  }
}

