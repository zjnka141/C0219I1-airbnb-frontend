import { Component, OnInit } from '@angular/core';
import { HouseService } from 'src/app/services/house.service';
import { House } from 'src/app/models/house';
import { Options,LabelType } from 'ng5-slider';
@Component({
  selector: 'app-list-house',
  templateUrl: './list-house.component.html',
  styleUrls: ['./list-house.component.scss']
})
export class ListHouseComponent implements OnInit {
  size=3;
  housePage:any;
  houses:House[]=[];
  totalPages:number=1;
  pages=[];
  pageClicked:number=0;
  searchText="";
  numOfBedroom="";
  typeOfBedroom="";
  numBed=[];
  typeBed=[];
  typeMapper={1:"Vip",2:"Standard"};
  constructor(private houseService: HouseService) { }

  ngOnInit() {
    this.loadData(0);
  }
  loadData(page){
    this.numOfBedroom=="" ? this.numBed=[1,2,3,4] : this.numBed=[parseInt(this.numOfBedroom)];
    this.typeOfBedroom=="" ? this.typeBed=["Vip","Standard"] : this.typeBed=[this.typeMapper[this.typeOfBedroom]];
    this.houseService.getHousePage(page,this.size,this.searchText, this.value, this.highValue, this.numBed, this.typeBed)
    .subscribe(
      data=>{
        this.pageClicked=page;
        this.housePage=data;
        this.houses=this.housePage.content;
        this.totalPages=this.housePage.totalPages;
        this.pages=Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
      }
    )
  }
  onNext(){
    this.pageClicked++;
    this.loadData(this.pageClicked);
  }
  onPrevious(){
    this.pageClicked--;
    this.loadData(this.pageClicked);
  }
  onFirst(){
    this.pageClicked=0;
    this.loadData(this.pageClicked);
  }
  onLast(){
    this.pageClicked=this.totalPages-1;
    this.loadData(this.pageClicked);
  }

  value: number = 0;
  highValue: number = 2000000;
  options: Options = {
    floor: 0,
    ceil: 100,
    stepsArray: [
      {value:0},
      {value:500000},
      {value:1000000},
      {value:1500000},
      {value:2000000},
    ],
    translate: (value: number, label: LabelType): string => {
      switch (value) {
        case 0:
          return value+'';
        case 500000:
          return '500,000';
        case 1000000:
          return '1,000,000';
        case 1500000:
          return '1,500,000';
        case 2000000:
          return '2,000,000';
        default:
          return value+'';
      }
    }
  };
  refreshForm(){
    this.value = 0;
    this.highValue = 2000000;
    this.searchText="";
    this.numOfBedroom="";
    this.typeOfBedroom="";
  }
}
