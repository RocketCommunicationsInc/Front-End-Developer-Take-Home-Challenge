import { Component, OnInit, ViewChild, AfterViewInit  } from '@angular/core';
import { stringify } from 'querystring';
import {DataService} from '../data.service'
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  alerts: [];
  contacts: [];
  totalContacts: number;
  contactStates: string;
  displayedColumns: string[] = ['contactName', 'contactStatus', 'contactBeginTimestamp', 'contactEndTimestamp'];
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort;

//   @ViewChild(MatSort) set matSort(sort: MatSort) {
//     this.dataSource.sort = sort;
// }

 

  constructor(private _data: DataService) { }

  // ngAfterViewInit() {
  //   // console.log({dataSource:this.dataSource})
  //   this.dataSource.sort = this.sort;
  // }

  ngOnInit() {

    this._data.getAlerts().subscribe(data => {
      this.alerts = data;
      // console.log(this.alerts.length);
    })

    this._data.getContacts().subscribe(data => {
      this.contacts = data;
      this.dataSource = new MatTableDataSource(data) ;
      this.dataSource.sort = this.sort ;
      // this.dataSource = new MatTableDataSource(this.contacts) ;
      this.totalContacts = data.length;
      
      const states = data.map((contact: any) => contact.contactState)
      this.contactStates = Array.from(new Set<string>(states)).join(', ')

      // console.log(this.contactStates)
    })
    
  }
}
