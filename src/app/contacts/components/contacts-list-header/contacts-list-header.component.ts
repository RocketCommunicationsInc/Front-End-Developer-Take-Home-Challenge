import { Component, Input, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { ContactsState, executingContactsSelector, failedContactsSelector } from '@grmContacts/contacts.state'
import { sortContacts } from '@grmContacts/contacts.actions'
import { Contact } from '@grmContacts/contacts.model'

@Component({
  selector: 'grm-contacts-list-header',
  template: '<grm-contacts-list-header-display [contacts]="contacts" [failedContacts]="failedContacts$ | async" ' +
    '[executingContacts]="executingContacts$ | async"></grm-contacts-list-header-display>'
})
export class ContactsListHeaderComponent implements OnInit {
  @Input() contacts: Contact[] | null

  failedContacts$!: Observable<Contact[]>
  executingContacts$!: Observable<Contact[]>

  constructor(
    private store: Store<ContactsState>
  ) { }

  ngOnInit(): void {
    this.failedContacts$ = this.store.select(failedContactsSelector)
    this.executingContacts$ = this.store.select(executingContactsSelector)
  }
}

@Component({
  selector: 'grm-contacts-list-header-display',
  templateUrl: './contacts-list-header.component.html',
  styleUrls: ['./contacts-list-header.component.scss']
})
export class ContactsListHeaderDisplayComponent implements OnInit {
  @Input() contacts: Contact[] | null
  @Input() failedContacts: Contact[] | null
  @Input() executingContacts: Contact[] | null

  constructor(
    private store: Store<ContactsState>
  ) { }

  ngOnInit(): void { }

  tapSort($event: any, column: string): void {
    $event.preventDefault()
    this.store.dispatch(sortContacts({column}))
  }

  hasContacts(contacts: Contact[] | null): boolean | null {
    return contacts && (contacts.length > 0)
  }
}
