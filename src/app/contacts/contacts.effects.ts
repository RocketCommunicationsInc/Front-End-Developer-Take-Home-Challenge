import { Injectable } from '@angular/core'
import { interval, of } from 'rxjs'
import { Store } from '@ngrx/store'
import { map, catchError, mergeMap, withLatestFrom, switchMap } from 'rxjs/operators'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { addActiveContact, addContacts, enableContactsTester, fetchContacts, fetchContactsFailure, fetchContactsSuccess,
  removeActiveContact, toggleActiveContact } from '@grmContacts/contacts.actions'
import { ContactsService } from '@grmContacts/contacts.service'
import { Contact } from '@grmContacts/contacts.model'
import { activeContactsSelector, contactsSelector, ContactsState } from '@grmContacts/contacts.state'
import { randomBetween } from '@grmCommon/utils/rand.utils'

/**
 * The contacts effects
 */
@Injectable()
export class ContactsEffects {
  /**
   * Fetches the contacts
   */
  fetchContacts$ = createEffect((): any => this.actions$
    .pipe(
      ofType(fetchContacts),
      mergeMap((action) => this.contactsService.loadContacts()
        .pipe(
          map((contacts: Contact[]) => fetchContactsSuccess({contacts})),
          catchError(error => of(fetchContactsFailure({
            error,
            message: 'Unable to fetch contacts, please try again'
          })))
        )
      )
    )
  )

  /**
   * Toggles an active contact
   */
  toggleActiveContact$ = createEffect((): any => this.actions$
    .pipe(
      ofType(toggleActiveContact),
      withLatestFrom(this.store.select(activeContactsSelector)),
      map(([action, activeContacts]) => {
        const activeContact: Contact = activeContacts?.find((contactId: any) => action.contact.contactId === contactId)
        if (activeContact) {
          return removeActiveContact({contactId: action.contact.contactId})
        }

        return addActiveContact({contactId: action.contact.contactId})
      })
    )
  )

  /**
   * Enables the random alert tester.
   * This helps to demonstrate how the observables work.
   */
  enableContactsTester$ = createEffect((): any => this.actions$
    .pipe(
      ofType(enableContactsTester),
      switchMap((action) => interval(action.interval)
        .pipe(
          withLatestFrom(this.store.select(contactsSelector)),
          map((contacts) => {
            const contactList: Contact[] = []

            if (contacts) {
              const newContactCount: number = randomBetween(1, 10)
              for (let i = 0; i < newContactCount; i++) {
                const randomContact: number = Math.floor(Math.random() * contacts.length)
                contactList.push(contacts[randomContact])
              }
            }

            return addContacts({contacts: contactList})
          })
        )
      )
    )
  )

  constructor(
    private actions$: Actions,
    private store: Store<ContactsState>,
    private contactsService: ContactsService
  ) { }
}
