import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import {DataService} from '../data.service'

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
  dataSource: [];

  constructor(private _data: DataService) { }

  ngOnInit() {

    this._data.getAlerts().subscribe(data => {
      this.alerts = data;
      // console.log(this.alerts.length);
    })

    this._data.getContacts().subscribe(data => {
      this.contacts = data;
      this.dataSource = data;
      this.totalContacts = this.contacts.length;
      
      const states = this.contacts.map((contact: any) => contact.contactState)
      this.contactStates = Array.from(new Set<string>(states)).join(', ')

      console.log(this.contactStates)
    })
  }
}
