import { Contact } from './contacts.model'

export class ContactsState {
  contacts: Contact[]
  activeContacts: string[]
  sortColumn?: string
  sortDirection: string

  constructor(
    contacts: Contact[],
    activeContacts: string[],
    sortColumn: string,
    sortDirection: string
  ) {
    this.contacts = contacts
    this.activeContacts = activeContacts
    this.sortColumn = sortColumn
    this.sortDirection = sortDirection
  }
}

export const defaultContactsState: ContactsState = {
  contacts: [],
  activeContacts: [],
  sortDirection: 'desc'
}

// Selectors
export const contactsSelector = (state: any) => state.contacts.contacts
export const failedContactsSelector = (state: any) => state.contacts.contacts
  .filter((contact: Contact) => contact.contactState === 'failed')

export const executingContactsSelector = (state: any) => state.contacts.contacts
  .filter((contact: Contact) => contact.contactState === 'executing')

export const activeContactsSelector = (state: any) => state.contacts.activeContacts
export const isActiveContactSelector = (state: any, props: any) => state.contacts.activeContacts &&
  state.contacts.activeContacts.find((contactId: string) => contactId === props.contactId)

export const sortColumnSelector = (state: any) => state.contacts.sortColumn
export const sortDirectionSelector = (state: any) => state.contacts.sortDirection
