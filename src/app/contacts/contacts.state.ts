import { Contact } from '@grmContacts/contacts.model'

/**
 * The contacts state
 */
export class ContactsState {
  contacts: Contact[]
  activeContacts: string[]
  sortColumn?: string
  sortDirection: string
  currentPage: number
  fetchStatus?: string
  error?: any
  errorMessage?: string
}

/**
 * The default contacts state
 */
export const defaultContactsState: ContactsState = {
  contacts: [],
  activeContacts: [],
  sortDirection: 'desc',
  currentPage: 0
}

// Selectors
export const contactsSelector = (state: any) => state.contacts.contacts
export const failedContactsSelector = (state: any) => state.contacts.contacts ? state.contacts.contacts
  .filter((contact: Contact) => contact.contactState === 'failed') : []

export const executingContactsSelector = (state: any) => state.contacts.contacts ? state.contacts.contacts
  .filter((contact: Contact) => contact.contactState === 'executing') : []

export const activeContactsSelector = (state: any) => state.contacts.activeContacts
export const isActiveContactSelector = (state: any, props: any) => state.contacts ? state.contacts.activeContacts &&
  state.contacts.activeContacts.find((contactId: string) => contactId === props.contactId) : false

export const sortColumnSelector = (state: any) => state.contacts.sortColumn
export const sortDirectionSelector = (state: any) => state.contacts.sortDirection
export const currentPageSelector = (state: any) => state.contacts.currentPage
export const fetchStatusSelector = (state: any) => state.contacts.fetchStatus
export const errorMessageSelector = (state: any) => state.contacts.errorMessage
