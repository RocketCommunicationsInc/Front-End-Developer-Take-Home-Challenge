import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { TitleCasePipe } from '@angular/common'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { toggleActiveContact } from '@grmContacts/contacts.actions'
import { Contact } from '@grmContacts/contacts.model'
import { ContactsState, isActiveContactSelector } from '@grmContacts/contacts.state'
import { isState } from '@grmContacts/contacts.utils'
import { FormatGRMTimePipe } from '@grmCommon/pipes/format-time.pipe'

/**
 * GRM Contact List Item component
 *
 * @example <grm-contacts-list-item [contact]="contact"></grm-contacts-list-item>
 */
@Component({
  selector: 'grm-contacts-list-item',
  template: '<grm-contacts-list-item-display [contact]="contact" [active]="active$ | async" ' +
    '(toggleActiveContact)="toggleActiveContact($event)"></grm-contacts-list-item-display>'
})
export class ContactsListItemComponent implements OnInit {
  @Input() contact: Contact | null

  active$: Observable<boolean>

  constructor(
    private store: Store<ContactsState>
  ) { }

  ngOnInit(): void {
    this.active$ = this.store.select(isActiveContactSelector, {contactId: this.contact?.contactId})
  }

  /**
   * Toggles an active contact
   *
   * @param contact
   */
  toggleActiveContact(contact: Contact): void {
    this.store.dispatch(toggleActiveContact({contact}))
  }
}

/**
 * GRM Contact List Item display component
 *
 * @example <grm-contacts-list-item [contact]="contact"></grm-contacts-list-item>
 */
@Component({
  selector: 'grm-contacts-list-item-display',
  templateUrl: './contacts-list-item.component.html',
  styleUrls: ['./contacts-list-item.component.scss'],
  providers: [
    TitleCasePipe
  ]
})
export class ContactsListItemDisplayComponent implements OnInit {
  @Input() contact: Contact | null
  @Input() active: boolean | null

  @Output() toggleActiveContact: EventEmitter<Contact> = new EventEmitter<Contact>()

  constructor(
    private titlecase: TitleCasePipe,
    private formatGRMTimePipe: FormatGRMTimePipe
  ) { }

  ngOnInit(): void { }

  /**
   * Gets the step text
   *
   * @param alert
   */
  getStep(contact: Contact): string {
    return `(Step: ${contact.contactStep})`
  }

  /**
   * Gets the AOS-LOS text
   *
   * @param contact
   */
  getAOSLOS(contact: Contact): string {
    return `${this.formatGRMTimePipe.transform(contact.contactBeginTimestamp)} - ` +
      `${this.formatGRMTimePipe.transform(contact.contactEndTimestamp)}`
  }

  /**
   * Handles the contact row tap
   *
   * @param $event
   * @param contact
   */
  tapTogglelContactRow($event: any, contact: Contact): void {
    $event.preventDefault()
    $event.stopPropagation()
    this.toggleActiveContact.emit(contact)
  }

  /**
   * Checks to see if the contact state is 'failed'
   *
   * @param contact
   */
  isStateFailed(contact: Contact): boolean {
    return isState(contact, 'failed')
  }
}
