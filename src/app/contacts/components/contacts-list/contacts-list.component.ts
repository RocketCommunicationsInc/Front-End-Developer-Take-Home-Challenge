import { Component, Input, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { ContactsState } from 'src/app/contacts/contacts.state'
import { Contact } from '../../contacts.model'
import { contactsSelector, sortColumnSelector, sortDirectionSelector } from '../../contacts.state'

@Component({
  selector: 'grm-contacts-list',
  template: '<grm-contacts-list-display fxFlex [contacts]="contacts$ | async" [sortColumn]="sortColumn$ | async" ' +
    '[sortDirection]="sortDirection$ | async"></grm-contacts-list-display>'
})
export class ContactsListComponent implements OnInit {
  contacts$: Observable<Contact[]> = this.store.select(contactsSelector)
  sortColumn$: Observable<string> = this.store.select(sortColumnSelector)
  sortDirection$: Observable<string> = this.store.select(sortDirectionSelector)

  constructor(
    private store: Store<ContactsState>
  ) { }

  ngOnInit(): void { }
}

@Component({
  selector: 'grm-contacts-list-display',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListDisplayComponent implements OnInit {
  @Input() contacts: Contact[] | null = []
  @Input() sortColumn: string | null = ''
  @Input() sortDirection: string | null = ''

  constructor() { }
  ngOnInit(): void { }
}
