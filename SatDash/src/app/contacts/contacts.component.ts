import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

// import { CONTACTS } from '../mock-contacts' replacing this with the below ContactService
import { Contact } from '../../contact';
import { ContactService } from '../contact.service';
import { DebuggerService } from '../debugger.service';
import { RuxPushButton } from '@astrouxds/rux-push-button/rux-push-button.js';

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
  failureCount: number;
  contactStatus: string;
  sortByStatus: any;

  public search: any = '';
  locked: any[] = [];

  onSelect(contact: Contact): void {
    this.selectedContact = contact;
    this.debuggerService.add(
      `Contacts: Selected Contact name = ${contact.contactName}`
    );
  }

  @Input()
  searchModel: string;

  constructor(
    private contactService: ContactService,
    private debuggerService: DebuggerService
  ) {}

  ngOnInit(): void {
    this.getContacts();
    console.log('hello from contacts');
  }

  getContacts(): void {
    this.contactService.getContacts().subscribe((contacts) => {
      this.contacts = contacts;
      this.contactStatus = this.contactStatus;
      this.contactCount = this.contacts.length;
      this.executingCount = this.contacts.filter(
        (contact) => contact.contactState === 'executing'
      ).length;
      this.failureCount = this.contacts.filter(
        (contact) => contact.contactState === 'failed'
      ).length;
      // this.sortByStatus = this.contacts.sort((a, b) =>
      //   a.contactStatus > b.contactStatus ? 1 : -1
      // );
    });
  }
}
