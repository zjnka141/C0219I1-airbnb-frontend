import { Component, OnInit } from "@angular/core";
import { HouseService } from "src/app/services/house.service";
import { ActivatedRoute, Router } from "@angular/router";
import { House } from "src/app/models/house";
import { BookingHouseComponent } from '../booking-house/booking-house.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: "app-view-house",
  templateUrl: "./view-house.component.html",
  styleUrls: ["./view-house.component.scss"]
})
export class ViewHouseComponent implements OnInit {
  house: House;
  imageUrls = [];
  constructor(private hs: HouseService, private route: ActivatedRoute,public dialog: MatDialog) {}

  ngOnInit() {
    this.getHouseDetails(this.route.snapshot.params["id"]);
    
  }
  getHouseDetails(id) {
    this.hs.getHouseById(id).subscribe(data => {
      this.house = data;
      this.imageUrls = this.house.image.split("||---||");
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(BookingHouseComponent, {
      // data: {id: id},
      width: '350px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log('Yes clicked');
        // DO SOMETHING
      }
    });
  }

}
