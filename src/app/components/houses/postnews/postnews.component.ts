import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { UploadImageComponent } from '../upload-image/upload-image.component';
import { House } from 'src/app/models/house';
import { HouseService } from 'src/app/services/house.service';


@Component({
  selector: 'app-postnews',
  templateUrl: './postnews.component.html',
  styleUrls: ['./postnews.component.css']
})
export class PostnewsComponent implements OnInit {

  purposes = [
    "both house and apartment for rent",
    "rent each room separately"
  ]

  typeOfHouses = [
    "Home Stay",
    "Hotel",
    "Vila"
  ]

  typeOfRooms = [
    "V.I.P",
    "Often"
  ]

  bedrooms = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"
  ]

  bathrooms = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"
  ]

  statuses = [
    "Not yet leased",
    "Leased"
  ]

  validation_messages = {
    'purpose': [
      { type: 'required', message: 'Please select purpose' },
    ],
    'name': [
      { type: 'required', message: 'Please select name' },
    ],
    'typeOfHouse': [
      { type: 'required', message: 'Please select type of house' },
    ],
    'typeOfRoom': [
      { type: 'required', message: 'Please select type of room' },
    ],
    'address': [
      { type: 'required', message: 'Please select address' },
    ],
    'bedroom': [
      { type: 'required', message: 'Please select bedroom' },
    ],
    'bathroom': [
      { type: 'required', message: 'Please select bathroom' },
    ],
    'description': [
      { type: 'required', message: 'Please select description' },
    ],
    'priceByNight': [
      { type: 'required', message: 'Please select price' },
    ],
    'priceByMonth': [
      { type: 'required', message: 'Please select price' },
    ],
    'area': [
      { type: 'required', message: 'Please select area' },
    ],

  };

  isOptional = false;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  ThirdFormGroup: FormGroup;
  FinalFormGroup: FormGroup;

  form: any = {};
  houseInfo: House;
  isPostNews = false;
  isPostNewsFailed = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, public dialog: MatDialog, private houseService: HouseService) { }

  ngOnInit() {
    this.createFirstForm();
    this.createSecondForm();
    this.createThirdForm();
    this.createFinalForm();
  }

  createFirstForm() {
    this.firstFormGroup = this.fb.group({
      purpose: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });
  }

  createSecondForm() {
    this.secondFormGroup = this.fb.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      typeOfHouse: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      typeOfRoom: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      address: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      bedroom: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      bathroom: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      description: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      priceByNight: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      priceByMonth: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      area: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      status: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });
  }

  createThirdForm() {
    this.ThirdFormGroup = this.fb.group({
    });
  }

  createFinalForm() {
    this.FinalFormGroup = this.fb.group({
    });
  }

  onsubmitFisrtForm() {
    console.log(this.firstFormGroup);
  }

  onsubmitSecondForm() {
    console.log(this.secondFormGroup);
  }

  onsubmitThirdForm() {
    console.log(this.ThirdFormGroup);

    const UPLOAD_IMAGE = this.dialog.open(UploadImageComponent, {
      width: '900px',
      height: '700px',
      data: {}
    });
    UPLOAD_IMAGE.afterClosed().subscribe(result => {
      console.log(`aaaa ${result}`);
    })
  }

  onsubmitFinalForm() {
    console.log(this.FinalFormGroup);
  }
}




