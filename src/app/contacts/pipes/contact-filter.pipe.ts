import { Pipe, PipeTransform } from '@angular/core'
import { Contact } from '@grmContacts/contacts.model'

/**
 * A pipe that filters the Contact list by status
 *
 * @example contacts | contactFilter:'executing'
 */
@Pipe({
  name: 'contactFilter'
})
export class ContactFilterPipe implements PipeTransform {
  transform(contacts: any[] | null, statusFilter: string | null): Contact[] {
    if (!contacts) {
      return []
    }

    if (statusFilter && statusFilter.trim().length) {
      contacts = contacts.filter((contact: Contact) => contact.contactStatus === statusFilter)
    }

    return contacts
  }
}
