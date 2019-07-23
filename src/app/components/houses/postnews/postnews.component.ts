import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, } from '@angular/forms';
import { MatDialog, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { UploadImageComponent } from '../upload-image/upload-image.component';
import { House } from 'src/app/models/house';
import { HouseService } from 'src/app/services/house.service';
import { Router } from '@angular/router';
import { GetImageUrlService } from 'src/app/shared/get-image-url.service';


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
    "VIP",
    "Standard"
  ]

  bedroomes = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"
  ]

  bathroomes = [
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
      { type: 'required', message: 'Please select Name Of House' },
      { type: 'minlength', message: 'House Name must be at least 5 characters long' },
      { type: 'maxlength', message: 'House Name cannot be more than 25 characters long' },
      { type: 'pattern', message: 'House Name no spaces please' }
    ],
    'typeHouse': [
      { type: 'required', message: 'Please select type of house' },
    ],
    'typeRoom': [
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
  imgUrl: Array<String> = [];

  constructor(private fb: FormBuilder, public dialog: MatDialog,
    private houseService: HouseService, public snackbar: MatSnackBar,
    private router: Router, private getImageUrlService: GetImageUrlService) { }

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
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern(/^\S+.*\S+$/)
      ])),
      typeHouse: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      typeRoom: new FormControl('', Validators.compose([
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

  onSubmitSecondForm() {
    console.log(this.secondFormGroup);
    this.getImageUrlService.updateUrl([]);
  }

  onsubmitThirdForm() {
    console.log(this.ThirdFormGroup);

    const UPLOAD_IMAGE = this.dialog.open(UploadImageComponent, {
      width: '1000px',
      height: '700px',
      data: {}
    });

    UPLOAD_IMAGE.afterClosed().subscribe(result => {
      console.log(`fix fix aaaaa ${result}`);
    });

    this.getImageUrlService.url.subscribe(url => {
      this.imgUrl = url;
      console.log("Image url in postnews component:::: ", this.imgUrl);
    })
  }

  form: any = {};
  houseInfo: House;
  isPostNews = false;
  isPostNewsFailed = false;
  errorMessage = '';

  onsubmitFinalForm() {
    console.log(this.FinalFormGroup);
    this.houseInfo = new House(
      this.form.name,
      this.form.typeHouse,
      this.form.typeRoom,
      this.form.numberOfBathrooms,
      this.form.numberOfBedrooms,
      this.form.address,
      this.form.describe,
      this.form.priceByNight,
      this.form.priceByMonth,
      this.form.status,
      this.imgUrl.join("||---||"),
      this.form.area
    );

    this.houseService.createNewHouse(this.houseInfo)
      .subscribe(data => {
        if (this.houseInfo == null) {
          this.isPostNews = false;
        } else {
          this.isPostNews = true;
          this.isPostNewsFailed = false;
          let snackbarRef = this.snackbar.open('Post News House Successfully!', 'Come Back Home', {
            horizontalPosition: 'center',
          });
          snackbarRef.onAction().subscribe(() => {
            this.router.navigate(['/']);
          })
        }
        console.log(data);
      },
        error => {
          this.errorMessage = error.error.message;
          console.log('fix fix aaaaaa', error);
          this.isPostNewsFailed = true;
        }
      )
  }
}




