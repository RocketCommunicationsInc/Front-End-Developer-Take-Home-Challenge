import { createAction, props } from '@ngrx/store'
import { Contact } from '@grmContacts/contacts.model'

/**
 * The fetch contacts action
 */
export const fetchContacts = createAction(
  '[Contacts] Fetch Contacts'
)

/**
 * The fetch contacts success action
 */
export const fetchContactsSuccess = createAction(
  '[Contacts] Fetch Contacts Success',
  props<{ contacts: Contact[] }>()
)

/**
 * The fetch contacts failure action
 */
export const fetchContactsFailure = createAction(
  '[Contacts] Fetch Contacts Failure',
  props<{ error: any; message: string }>()
)

/**
 * The toggle active contact action
 */
export const toggleActiveContact = createAction(
  '[Contacts] Toggle Active Contact',
  props<{ contact: Contact }>()
)

/**
 * The add active contact action
 */
export const addActiveContact = createAction(
  '[Contacts] Add Active Contact',
  props<{ contactId: string }>()
)

/**
 * The remove active contact action
 */
export const removeActiveContact = createAction(
  '[Contacts] Remove Active Contact',
  props<{ contactId: string }>()
)

/**
 * The sort contacts action
 */
export const sortContacts = createAction(
  '[Contacts] Sort Contacts',
  props<{ column: string }>()
)
