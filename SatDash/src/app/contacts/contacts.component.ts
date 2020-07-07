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

  constructor(
    private contactService: ContactService,
    private debuggerService: DebuggerService
  ) {}

  getContacts(): void {
    this.contactService
      .getContacts()
      .subscribe((contacts) => (this.contacts = contacts));
  }

  ngOnInit(): void {
    this.getContacts();
  }

  onSelect(contact: Contact): void {
    this.selectedContact = contact;
    this.debuggerService.add(
      `Contact Component: Selected Contact id=${contact._id}`
    );
  }
}

// unfortunately, this wont work. the ContactService.getContacts() method has a synchronous signature
// tldr, it will fail if it can't fetch contacts properly since it's synchronous. we'll replace it with an observable that subscribes to updates so it's async
