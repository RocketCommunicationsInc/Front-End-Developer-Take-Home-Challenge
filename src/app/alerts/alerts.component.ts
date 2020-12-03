import { Component, AfterContentChecked, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements AfterContentChecked {
  displayedColumns: string[] = ['errorMessage', 'errorCategory', 'errorTime'];
  dataSource: any
  @ViewChild(MatSort) sort: MatSort;

  constructor() {}

  ngAfterContentChecked(): void {
    this.dataSource = new MatTableDataSource(JSON.parse(localStorage.getItem('alertsData')));
    this.dataSource.sort = this.sort;
  }

}
