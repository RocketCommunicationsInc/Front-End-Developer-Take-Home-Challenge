import { Pipe, PipeTransform } from '@angular/core';
import { ContactsComponent } from '../contacts/contacts.component';

@Pipe({
  name: 'contactFilter',
})
export class ContactFilterPipe implements PipeTransform {
  transform(list: any[], filterText: string): any {
    return list
      ? list.filter(
          (contact) => contact.contactResolution.search(filterText, 'i') > -1
        )
      : [];
  }
}
