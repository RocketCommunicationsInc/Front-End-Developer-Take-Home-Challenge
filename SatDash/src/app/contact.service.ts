import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Contact } from '../contact';
import { CONTACTS } from './mock-contacts';
import { DebuggerService } from './debugger.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private debuggerService: DebuggerService) {}

  getContacts(): Observable<Contact[]> {
    this.debuggerService.add('Debugger: fetched all contacts');
    return of(CONTACTS);
  }

  getContact(contactName: number): Observable<Contact> {
    this.debuggerService.add(`Debugger: fetched contact ${contactName}`);
    return of(CONTACTS.find((contact) => contact.contactName === contactName));
  }
}
