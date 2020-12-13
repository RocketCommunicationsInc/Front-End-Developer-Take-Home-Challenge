import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { ContactsState, executingContactsSelector, failedContactsSelector, statusListSelector } from '@grmContacts/contacts.state'
import { saveCurrentPage, selectedStatus, sortContacts } from '@grmContacts/contacts.actions'
import { Contact } from '@grmContacts/contacts.model'

/**
 * GRM Contacts List Header component
 *
 * @example <grm-contacts-list-header [contacts]="contacts"></grm-contacts-list-header>
 */
@Component({
  selector: 'grm-contacts-list-header',
  template: '<grm-contacts-list-header-display [contacts]="contacts" [failedContacts]="failedContacts$ | async" ' +
    '[executingContacts]="executingContacts$ | async" [statusList]="statusList$ | async" ' +
    '(sortContacts)="sortContacts($event)" (saveCurrentPage)="saveCurrentPage($event)" ' +
    '(selectedStatus)="selectedStatus($event)"></grm-contacts-list-header-display>'
})
export class ContactsListHeaderComponent implements OnInit {
  @Input() contacts: Contact[] | null

  failedContacts$: Observable<Contact[]> = this.store.select(failedContactsSelector)
  executingContacts$: Observable<Contact[]> = this.store.select(executingContactsSelector)
  statusList$: Observable<string[]> = this.store.select(statusListSelector)

  constructor(
    private store: Store<ContactsState>
  ) { }

  ngOnInit(): void { }

  /**
   * Sorts the contacts by column
   *
   * @param column
   */
  sortContacts(column: string): void {
    this.store.dispatch(sortContacts({column}))
  }

  /**
   * Saves the current page
   *
   * @param page
   */
  saveCurrentPage(page: number): void {
    this.store.dispatch(saveCurrentPage({page}))
  }

  /**
   * Sets the selected status
   *
   * @param status
   */
  selectedStatus(status: string): void {
    this.store.dispatch(selectedStatus({status}))
  }
}

/**
 * GRM Alerts List Header display component
 *
 * @example <grm-contacts-list-header-display [contacts]="contacts"></grm-contacts-list-header-display>
 */
@Component({
  selector: 'grm-contacts-list-header-display',
  templateUrl: './contacts-list-header.component.html',
  styleUrls: ['./contacts-list-header.component.scss']
})
export class ContactsListHeaderDisplayComponent implements OnInit {
  @Input() contacts: Contact[] | null
  @Input() failedContacts: Contact[] | null
  @Input() executingContacts: Contact[] | null
  @Input() statusList: string[] | null

  @Output() sortContacts: EventEmitter<string> = new EventEmitter<string>()
  @Output() saveCurrentPage: EventEmitter<number> = new EventEmitter<number>()
  @Output() selectedStatus: EventEmitter<string> = new EventEmitter<string>()

  constructor() { }
  ngOnInit(): void { }

  /**
   * Handles the sort tap
   *
   * @param $event
   * @param column
   */
  tapSort($event: any, column: string): void {
    $event.preventDefault()
    this.sortContacts.emit(column)
  }

  /**
   * Sets the current page
   *
   * @param $event
   */
  setCurrentPage($event: any): void  {
    this.saveCurrentPage.emit($event)
  }

  /**
   * Checks to see if any contacts exist
   *
   * @param contacts
   */
  hasContacts(contacts: Contact[] | null): boolean | null {
    return contacts && (contacts.length > 0)
  }

  /**
   * Changes the status filter
   *
   * @param $event
   */
  changeStatus($event: any): void {
    this.selectedStatus.emit($event.target.value)
  }
}
