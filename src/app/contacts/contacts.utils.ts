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

  if (statusFilter && statusFilter.trim().length) {
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
