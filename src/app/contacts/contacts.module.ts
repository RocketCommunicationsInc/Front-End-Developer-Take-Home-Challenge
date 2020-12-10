import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FlexLayoutModule } from '@angular/flex-layout'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { ContactsEffects } from './contacts.effects'
import { ContactsService } from './contacts.service'
import { contactsReducers } from './contacts.reducer'
import { defaultContactsState } from './contacts.state'
import { ContactsListComponent, ContactsListDisplayComponent } from './components/contacts-list/contacts-list.component'
import { ContactsListHeaderComponent,
  ContactsListHeaderDisplayComponent } from './components/contacts-list-header/contacts-list-header.component'
import { ContactsListItemComponent,
  ContactsListItemDisplayComponent } from './components/contacts-list-item/contacts-list-item.component'
import { ContactSortPipe } from './pipes/contact-sort.pipe'
import { ContactTimePipe } from './pipes/contact-time.pipe'
import '@astrouxds/rux-status'

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('contacts', contactsReducers, {
      initialState: defaultContactsState
    }),
    EffectsModule.forFeature([
      ContactsEffects
    ]),
    FlexLayoutModule
  ],
  declarations: [
    ContactsListComponent,
    ContactsListDisplayComponent,
    ContactsListHeaderComponent,
    ContactsListHeaderDisplayComponent,
    ContactsListItemComponent,
    ContactsListItemDisplayComponent,
    ContactSortPipe,
    ContactTimePipe
  ],
  providers: [
    ContactsService
  ],
  exports: [
    ContactsListComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ContactsModule { }
