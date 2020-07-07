import { Component, OnInit } from '@angular/core';
import { Contact } from '../../contact';
// import { CONTACTS } from '../mock-contacts' replacing this with the below ContactService
import { ContactService } from '../contact.service';

// this is generated each time you use the ng generate component cli command
@Component({
  selector: 'app-contacts', // components css selector
  templateUrl: './contacts.component.html', // the location of the components template
  styleUrls: ['./contacts.component.scss'], // the location of the components private css styles
})
export class ContactsComponent implements OnInit {
  contacts: Contact[];
  selectedContact: Contact;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {}

  onSelect(contact: Contact): void {
    this.selectedContact = contact;
  }
}
