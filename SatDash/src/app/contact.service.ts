import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Contact } from '../contact';
import { CONTACTS } from './mock-contacts';
import { DebuggerService } from './debugger.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(
    private http: HttpClient,
    private debuggerService: DebuggerService
  ) {}

  private log(message: string) {
    this.debuggerService.add(`ContactService: ${message}`);
  }

  private contactUrl = 'api/contacts'; // URL to web api

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactUrl).pipe(catchError(this.handleError<Contact[]>('getContacts', []))
  }

  getContact(contactName: number): Observable<Contact> {
    // send message after fetching contact
    this.debuggerService.add(
      `ContactService: fetched the specific contact: ${contactName}`
    );
    return of(CONTACTS.find((contact) => contact.contactName === contactName));
  }
}
