import { Pipe, PipeTransform } from '@angular/core'
import { Contact } from '@grmContacts/contacts.model'
import { getFilteredContacts } from '@grmContacts/contacts.utils'

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

    return getFilteredContacts(contacts, statusFilter)
  }
}
