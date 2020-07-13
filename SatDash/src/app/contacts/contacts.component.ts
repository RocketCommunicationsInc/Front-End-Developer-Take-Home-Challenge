import { Component, OnInit } from '@angular/core';

// import { CONTACTS } from '../mock-contacts' replacing this with the below ContactService
import { Contact } from '../../contact';
import { ContactService } from '../contact.service';
import { DebuggerService } from '../debugger.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  contacts: Contact[];

  selectedContact: Contact;

  contactCount: number;
  executingCount: number;
  failedCount: number;

  // this.contactsCount

  onSelect(contact: Contact): void {
    this.selectedContact = contact;
    this.contactService;
  }

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(): void {
    this.contactService.getContacts().subscribe((contacts) => {
      this.contacts = contacts;
      this.contactCount = this.contacts.length;
    });
  }
}
