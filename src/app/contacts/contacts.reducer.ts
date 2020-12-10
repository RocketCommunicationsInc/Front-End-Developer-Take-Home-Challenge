import { ActionReducer, createReducer, on } from '@ngrx/store'
import { addActiveContact, fetchContactsFailure, fetchContactsSuccess, removeActiveContact, sortContacts } from './contacts.actions'
import { ContactsState, defaultContactsState } from './contacts.state'

export const contactsReducers: ActionReducer<ContactsState> = createReducer(
  defaultContactsState,
  on(fetchContactsSuccess, (state: ContactsState, { contacts }) => ({
    ...state,
    contacts
  })),
  on(fetchContactsFailure, (state, { error, message }) => ({
    ...state,
    error,
    errorMessage: message
  })),
  on(addActiveContact, (state, { contactId }) => ({
    ...state,
    activeContacts: state.activeContacts.concat(contactId)
  })),
  on(removeActiveContact, (state, { contactId }) => ({
    ...state,
    activeContacts: state.activeContacts.filter(_contactId => _contactId !== contactId)
  })),
  on(sortContacts, (state, { column }) => ({
    ...state,
    sortColumn: column,
    sortDirection: (state.sortDirection === 'desc') ? 'asc' : 'desc'
  }))
)
