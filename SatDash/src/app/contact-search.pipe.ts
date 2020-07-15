import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contactSearchPipe',
})
export class ContactSearchPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
