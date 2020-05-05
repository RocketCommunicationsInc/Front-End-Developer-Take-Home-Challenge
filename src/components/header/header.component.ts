import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() onAlertsClicked = new EventEmitter<boolean>();
  @Output() onAllClicked = new EventEmitter<boolean>();
  @Output() onContactsClicked = new EventEmitter<boolean>();

  allClicked: boolean;
  contactsClicked: boolean;
  alertsClicked: boolean;

  name: string = 'E. Evardone';

  constructor() { }

  ngOnInit(): void {
    this.allClicked = true;
  }

  all() {
    this.onAllClicked.emit(true);
    this.allClicked = true;
    this.alertsClicked = false;
    this.contactsClicked = false;
  }

  alerts() {
    this.onAlertsClicked.emit(true);  
    this.alertsClicked = true;
    this.allClicked = false;
    this.contactsClicked = false;
  }

  contacts() {
    this.onContactsClicked.emit(true);    
    this.contactsClicked = true;
    this.allClicked = false;
    this.alertsClicked = false;
  }

  linkColorAll() {
    return this.allClicked ? 'active' : 'inactice'
  }

  linkColorAlerts() {
    return this.alertsClicked ? 'active' : 'inactice'
  }

  linkColorContact() {
    return this.contactsClicked ? 'active' : 'inactice'
  }

}
