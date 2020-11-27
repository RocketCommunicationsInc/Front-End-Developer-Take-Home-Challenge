import { Component, OnInit, ViewChild } from '@angular/core';
import {DataService} from '../data.service'
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  alerts: [];
  contacts: [];
  totalContacts: number;
  contactStates: string;
  displayedColumns: string[] = ['errorMessage', 'errorCategory', 'errorTime'];
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _data: DataService) { }

  ngOnInit() {

    this._data.getAlerts().subscribe(data => {
      this.alerts = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      // console.log(this.alerts.length);
    })

    // this._data.getContacts().subscribe(data => {
    //   this.contacts = data;
    //   this.dataSource = new MatTableDataSource(data) ;
    //   this.dataSource.sort = this.sort ;
    //   this.totalContacts = data.length;
      
    //   const states = data.map((contact: any) => contact.contactState)
    //   this.contactStates = Array.from(new Set<string>(states)).join(', ')
    // })
    
  }

}
