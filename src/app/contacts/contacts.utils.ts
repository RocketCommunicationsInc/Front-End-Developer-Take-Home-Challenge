import { Contact } from '@grmContacts/contacts.model'

/**
 * Gets the contacts with optional filter for status
 *
 * @param contacts
 * @param statusFilter
 */
export const getFilteredContacts = (contacts: Contact[] | null, statusFilter: string | null) => {
  if (!contacts) {
    return []
  }

  if (statusFilter && statusFilter.trim().length && (statusFilter.trim() !== 'all')) {
    contacts = contacts.filter((contact: Contact) => contact.contactStatus === statusFilter)
  }

  return contacts
}

/**
 * Gets the active contacts count with optional filters for severity and category
 *
 * @param contacts
 * @param statusFilter
 */
export const getContactsCount = (contacts: Contact[] | null, statusFilter: string | null) =>
  getFilteredContacts(contacts, statusFilter).length


/**
 * Checks to see if the contact state matches the given state
 *
 * @param contact
 * @param state
 */
export const isState = (contact: Contact, state: string): boolean =>
  contact.contactState === state
