import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSourceService } from '../../../services/data-source.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-contacts-table',
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.styl']
})
// Contacts table component to pull in contacts data
export class ContactsTableComponent implements OnInit {
    constructor(private dataService: DataSourceService) { }
    dataSource;
    dataLength = 0;
    contactsFailed = 0;
    contactsExecuting = 0;
    status;
    dataError = false;
    loaded = false;
    displayedColumns: string[] = ['contactName', 'contactStatus', 'contactBeginTimestamp', 'contactEndTimestamp'];
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    ngOnInit(): void {
        this.getDataFromSource();
    }
    // get contacts data from data service
    // calls: dataservice.getContacts which returns array of contact objects
    getDataFromSource() {
        this.dataService.getContacts().subscribe(data => {
            this.dataLength = Object.keys(data).length;
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.sort = this.sort; // make content sortable
            this.dataSource.paginator = this.paginator; // make content pagable
            this.status = this.getUniqueValues(data);
            this.contactsFailed = this.status.failed;
            this.contactsExecuting = this.status.executing;
        }, err => {
            this.dataError = true;
            console.log(err);
        }, () => {
            this.dataError = false;
            this.loaded = true;

        });
    }
    // filter search results
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    // get number of each contact state value
    // returns array: contactState => number of occurrences
    getUniqueValues(obj) {
        let val;
        const results = {};
        for (const value of obj) {
            val = value.contactState;
            if (!results[val]) {
                results[val] = 0;
            }
            results[val] += 1;
        }
        return results;
    }

}
