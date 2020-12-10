import { Component, Input, OnInit } from '@angular/core'
import { TitleCasePipe } from '@angular/common'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { toggleActiveContact } from '../../contacts.actions'
import { Contact } from '../../contacts.model'
import { ContactsState, isActiveContactSelector } from '../../contacts.state'
import { FormatGRMTimePipe } from 'src/app/common/pipes/format-time.pipe'

@Component({
  selector: 'grm-contacts-list-item',
  template: '<grm-contacts-list-item-display [contact]="contact" [active]="active$ | async"></grm-contacts-list-item-display>'
})
export class ContactsListItemComponent implements OnInit {
  @Input() contact: Contact | null = null

  active$!: Observable<boolean>

  constructor(
    private store: Store<ContactsState>
  ) { }

  ngOnInit(): void {
    this.active$ = this.store.select(isActiveContactSelector, {contactId: this.contact?.contactId})
  }
}

@Component({
  selector: 'grm-contacts-list-item-display',
  templateUrl: './contacts-list-item.component.html',
  styleUrls: ['./contacts-list-item.component.scss'],
  providers: [
    TitleCasePipe
  ]
})
export class ContactsListItemDisplayComponent implements OnInit {
  @Input() contact: Contact | null = null
  @Input() active: boolean | null = false

  constructor(
    private store: Store<ContactsState>,
    private titlecase: TitleCasePipe,
    private formatGRMTimePipe: FormatGRMTimePipe
  ) { }

  ngOnInit(): void { }

  getStatus(contact: Contact): string {
    return `${this.titlecase.transform(contact.contactState)} (Step: ${contact.contactStep})`
  }

  getAOSLOS(contact: Contact): string {
    return `${this.formatGRMTimePipe.transform(contact.contactBeginTimestamp)} - ` +
      `${this.formatGRMTimePipe.transform(contact.contactEndTimestamp)}`
  }

  tapTogglelContactRow($event: any, contact: Contact): void {
    $event.preventDefault()
    $event.stopPropagation()
    this.store.dispatch(toggleActiveContact({contact}))
  }
}
