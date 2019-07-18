import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { House } from 'src/app/models/house';
import { element } from 'protractor';
import { HouseService } from 'src/app/services/house.service';
import { MatTableDataSource, MatSort} from '@angular/material';

@Component({
  selector: 'app-list-house',
  templateUrl: './list-house.component.html',
  styleUrls: ['./list-house.component.css']
})
export class ListHouseComponent implements OnInit, AfterViewInit {
  public displayedColumns = ['name','status','address','update'];
  public dataSource = new MatTableDataSource<House>();
  house: House;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private houseService: HouseService) { }

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
