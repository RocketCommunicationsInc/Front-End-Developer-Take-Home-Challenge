import { Pipe, PipeTransform } from '@angular/core'
import { SortDirection } from '@grmCommon/enums/sort.enums'
import { Contact } from '@grmContacts/contacts.model'

/**
 * A pipe that sorts the Contact list by a given column name and direction
 *
 * @example contacts | contactSort:'contactName':'asc'
 */
@Pipe({
  name: 'contactSort'
})
export class ContactSortPipe implements PipeTransform {
  transform(contacts: any[] | null, column: string | null, direction: string | null): Contact[] {
    if (!contacts) {
      return []
    }

    if (!column) {
      return contacts
    }

    // Create a copy and sort it
    return contacts.slice().sort((a, b) => {
      const column1: any = a[column]
      const column2: any = b[column]
      if (column1 > column2) {
        return (direction === SortDirection.desc) ? 1 : -1
      }

      if (column1 < column2) {
        return (direction === SortDirection.desc) ? -1 : 1
      }

      return 0
    })
  }
}
