import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Contact } from '../../contact';
import { ContactService } from '../contact.service';
import { DebuggerService } from '../debugger.service';

@Component({
  selector: 'app-contact-search',
  templateUrl: './contact-search.component.html',
  styleUrls: ['./contact-search.component.scss'],
})
export class ContactSearchComponent implements OnInit {
  contacts: Contact[];

  selectedContact: Contact;
  contacts$: Observable<Contact[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private contactService: ContactService,
    private debuggerService: DebuggerService
  ) {}

  // Push a search term into the observable stream.
  search(term: any): void {
    this.searchTerms.next(term);
  }

  onSelect(contact: Contact): void {
    this.selectedContact = contact;
    this.debuggerService.add(
      `Contacts: Selected Contact name = ${contact.contactName}`
    );
  }

  ngOnInit(): void {
    this.contacts$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: any) => this.contactService.searchContacts(term))
    );
  }
}
