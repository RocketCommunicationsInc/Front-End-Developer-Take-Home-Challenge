import { Injectable } from '@angular/core';
import { Contact } from '../contact';
import { CONTACTS } from './mock-contacts';
import { Observable, of } from 'rxjs';
import { DebuggerService } from './debugger.service';

// components shouldnt fetch or save data directly
// they shouldnt knowingly present fake data, either. they should focus on
// presenting data and delegate data access to a service

// servics are a great way to share information among classes that don't know each other.
@Injectable({
  // accepts metadata just like @Component() does for components
  // by default, ng generate service registers a provider with the root injector for your service by including provider metadata
  // when you provide the service at the root level, angular creates a single, shared instance of the ContactService that injects into any class that asks for it.

  providedIn: 'root',
})

// of(CONTACTS) returns an Observable<Contact[]> that emits a single value, the array of mock contacts.
export class ContactService {
  getContacts(): Observable<Contact[]> {
    this.debuggerService.add('ContactService: fetched contacts');
    return of(CONTACTS);
  }
  constructor(private debuggerService: DebuggerService) {}
}
