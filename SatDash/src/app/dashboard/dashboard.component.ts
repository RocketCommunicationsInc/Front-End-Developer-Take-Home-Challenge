import { Component, OnInit } from '@angular/core';
import { Contact } from '../../contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(private ContactService: ContactService) {}

  ngOnInit(): void {
    this.getContacts();
  }

  // replace this with contacts.flagged === true or something more useful than just the top four contacts
  getContacts(): void {
    this.ContactService.getContacts().subscribe(
      (contacts) => (this.contacts = contacts.slice(0, 4))
    );
  }
}
