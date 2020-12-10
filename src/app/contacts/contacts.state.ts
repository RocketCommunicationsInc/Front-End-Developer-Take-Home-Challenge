import { Contact } from './contacts.model'

export class ContactsState {
  contacts: Contact[] = []
  activeContacts: string[] = []
  sortColumn: string = ''
  sortDirection: string = ''
  fetchStatus: string = ''
  error: any
  errorMessage?: string = ''
}

export const defaultContactsState: ContactsState = {
  contacts: [],
  activeContacts: [],
  sortColumn: '',
  sortDirection: 'desc',
  fetchStatus: '',
  error: null,
  errorMessage: ''
}

// Selectors
export const contactsSelector = (state: any) => state.contacts.contacts
export const failedContactsSelector = (state: any) => state.contacts.contacts ? state.contacts.contacts
  .filter((contact: Contact) => contact.contactState === 'failed') : []

export const executingContactsSelector = (state: any) => state.contacts.contacts ? state.contacts.contacts
  .filter((contact: Contact) => contact.contactState === 'executing') : []

export const activeContactsSelector = (state: any) => state.contacts.activeContacts
export const isActiveContactSelector = (state: any, props: any) => state.contacts.activeContacts &&
  state.contacts.activeContacts.find((contactId: string) => contactId === props.contactId)

export const sortColumnSelector = (state: any) => state.contacts.sortColumn
export const sortDirectionSelector = (state: any) => state.contacts.sortDirection
export const fetchStatusSelector = (state: any) => state.contacts.fetchStatus
export const errorMessageSelector = (state: any) => state.contacts.errorMessage
