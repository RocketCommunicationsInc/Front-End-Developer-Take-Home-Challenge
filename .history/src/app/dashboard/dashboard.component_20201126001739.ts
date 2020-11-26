import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  alerts: Object;
  contacts: Object;
  numContacts: number;

  constructor(private _data: DataService) { }

  ngOnInit() {

    this._data.getAlerts().subscribe(data => {
      this.alerts = data;
      // console.log(this.alerts);
    })

    this._data.getContacts().subscribe(data => {
      this.contacts = data;
      console.log(Object.keys(this.contacts).length);
      // this.numContacts = this.contacts
    })
  }
}
