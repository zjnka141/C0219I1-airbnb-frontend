import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { HouseService } from 'src/app/services/house.service';
import { House } from 'src/app/models/house';

@Component({
  selector: 'app-manage-house',
  templateUrl: './manage-house.component.html',
  styleUrls: ['./manage-house.component.scss']
})
export class ManageHouseComponent implements OnInit, AfterViewInit {

  public displayedColumns = ['name', 'status', 'address'];
  public dataSource = new MatTableDataSource<House>();
  house: House;
  listStatus =['Đang thuê', 'Chưa thuê'];
  
  constructor(private houseService: HouseService) { }
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this.reloadData();
  }
  reloadData() {
    this.houseService.getHouseList().subscribe(data => {
      this.dataSource.data = data as House[];
    })
  }
  updateStatusOfHouse(event, id: number) {
      this.houseService.updateStatus(id,event.value).subscribe(data => {
        this.reloadData();
      })
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
