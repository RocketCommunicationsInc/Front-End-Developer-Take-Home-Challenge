import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contactsCount',
})
export class ContactsCountPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
