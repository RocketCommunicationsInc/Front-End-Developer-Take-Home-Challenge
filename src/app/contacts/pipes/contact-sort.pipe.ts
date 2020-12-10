import { Pipe, PipeTransform } from '@angular/core'
import { Contact } from '../contacts.model'

@Pipe({
  name: 'contactSort'
})
export class ContactSortPipe implements PipeTransform {
  transform(contacts: any[] | null, column: string | null, direction: string | null): Contact[] | null {
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
        return (direction === 'desc') ? 1 : -1
      }

      if (column1 < column2) {
        return (direction === 'desc') ? -1 : 1
      }

      return 0
    })
  }
}
