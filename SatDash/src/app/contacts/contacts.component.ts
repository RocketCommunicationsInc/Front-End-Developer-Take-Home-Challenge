import { Component, OnInit } from '@angular/core';

// import { CONTACTS } from '../mock-contacts' replacing this with the below ContactService
import { Contact } from '../../contact';
import { ContactService } from '../contact.service';
import { DebuggerService } from '../debugger.service';

// this is generated each time you use the ng generate component cli command
@Component({
  selector: 'app-contacts', // components css selector
  templateUrl: './contacts.component.html', // the location of the components template
  styleUrls: ['./contacts.component.scss'], // the location of the components private css styles
})
export class ContactsComponent implements OnInit {
  contacts: Contact[];

  selectedContact: Contact;

  onSelect(contact: Contact): void {
    this.selectedContact = contact;
    this.contactService;
  }

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(): void {
    this.contactService
      .getContacts()
      .subscribe((contacts) => (this.contacts = contacts));
  }
}
