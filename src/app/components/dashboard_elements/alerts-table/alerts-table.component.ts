import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataSourceService } from '../../../services/data-source.service';

@Component({
  selector: 'app-alerts-table',
  templateUrl: './alerts-table.component.html',
  styleUrls: ['./alerts-table.component.styl']
})
// Alerts table component to pull in contacts data
export class AlertsTableComponent implements OnInit {
    constructor(private dataService: DataSourceService) { }
    dataSource;
    dataLength;
    dataError = false;
    loaded = false;
    displayedColumns: string[] = ['errorMessage', 'errorCategory', 'errorTime'];
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    ngOnInit(): void {
        this.getDataFromSource();
    }
    // filter search results
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    // get alerts data from data service
    // calls: dataservice.getContacts which returns array of alert objects
    getDataFromSource() {
        this.dataService.getAlerts().subscribe(data => {
            this.dataLength = Object.keys(data).length;
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.sort = this.sort; // make content sortable
            this.dataSource.paginator = this.paginator; // make content pagable
        }, err => {
            this.dataError = true;
            console.log(err);
        }, () => {
            this.dataError = false;
            this.loaded = true;
        });
    }
}
