import { Component, OnInit } from "@angular/core";
import { HouseService } from "src/app/services/house.service";
import { ActivatedRoute, Router } from "@angular/router";
import { House } from "src/app/models/house";

@Component({
  selector: "app-view-house",
  templateUrl: "./view-house.component.html",
  styleUrls: ["./view-house.component.scss"]
})
export class ViewHouseComponent implements OnInit {
  house: House;
  imageUrls = [];
  constructor(private hs: HouseService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getHouseDetails(this.route.snapshot.params["id"]);
    
  }
  getHouseDetails(id) {
    this.hs.getHouseById(id).subscribe(data => {
      this.house = data;
      this.imageUrls = this.house.image.split("||---||");
    });
  }

}
