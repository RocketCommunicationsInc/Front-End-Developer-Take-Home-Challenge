import { Component, OnInit } from '@angular/core';
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
  contactStates: string[]

  constructor(private _data: DataService) { }

  ngOnInit() {

    this._data.getAlerts().subscribe(data => {
      this.alerts = data;
      console.log(this.alerts.length);
    })

    this._data.getContacts().subscribe(data => {
      this.contacts = data;
      this.totalContacts = this.contacts.length;
      this.contactStates = [...new Set(this.contacts.map(contact => contact.contactState))]
    })
  }
}
