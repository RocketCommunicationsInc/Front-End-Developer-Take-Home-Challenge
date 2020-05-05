import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  toggleAll: boolean = false;
  toggleAlerts: boolean = false;
  toggleContacts: boolean = false;

  constructor() {}

  ngOnInit() {
    this.toggleAll = true;
    this.toggleAlerts = true;
    this.toggleContacts = true;
  }

  all() {
    this.toggleAll = true;
    this.toggleAlerts = true;
    this.toggleContacts = true;
  }

  alerts() {
    this.toggleAll = false;
    this.toggleAlerts = true;
    this.toggleContacts = false;
  }

  contacts() {
    this.toggleContacts = true;
    this.toggleAll = false;
    this.toggleAlerts = false;
  }
}
