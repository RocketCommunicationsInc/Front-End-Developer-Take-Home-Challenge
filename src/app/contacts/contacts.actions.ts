import { createAction, props } from '@ngrx/store'
import { Contact } from './contacts.model'

export const fetchContacts = createAction(
  '[Contacts] Fetch Contacts'
)

export const fetchContactsSuccess = createAction(
  '[Contacts] Fetch Contacts Success',
  props<{ contacts: Contact[] }>()
)

export const fetchContactsFailure = createAction(
  '[Contacts] Fetch Contacts Failure',
  props<{ error: any; message: string }>()
)

export const toggleActiveContact = createAction(
  '[Contacts] Toggle Active Contact',
  props<{ contact: Contact }>()
)

export const addActiveContact = createAction(
  '[Contacts] Add Active Contact',
  props<{ contactId: string }>()
)

export const removeActiveContact = createAction(
  '[Contacts] Remove Active Contact',
  props<{ contactId: string }>()
)

export const sortContacts = createAction(
  '[Contacts] Sort Contacts',
  props<{ column: string }>()
)
