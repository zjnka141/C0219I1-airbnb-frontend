import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { HouseService } from 'src/app/services/house.service';
import { House } from 'src/app/models/house';

@Component({
  selector: 'app-list-house',
  templateUrl: './list-house.component.html',
  styleUrls: ['./list-house.component.scss']
})
export class ListHouseComponent implements OnInit, AfterViewInit {

  public displayedColumns = ['name', 'status', 'address', 'update'];
  public dataSource = new MatTableDataSource<House>();
  house: House;



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
  updateStatusOfHouse(id: number) {
    if (confirm("Bạn có muốn cập nhật trạng thái của nhà này hay không?")) {
      this.houseService.updateStatus(id, this.house).subscribe(data => {
        this.reloadData();
      })
    }
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
