import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Contact } from '../contact';
import { CONTACTS } from './mock-contacts';
import { DebuggerService } from './debugger.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private debuggerService: DebuggerService) {}

  getContacts(): Observable<Contact[]> {
    // todo : send the message after fetching contacts
    this.debuggerService.add('ContactService: fetched contacts');
    return of(CONTACTS);
  }

  getContact(contactName: number): Observable<Contact> {
    // send message after fetching contact
    this.debuggerService.add(
      `ContactService: fetched the specific contact: ${contactName}`
    );
    return of(CONTACTS.find((contact) => contact.contactName === contactName));
  }
}
