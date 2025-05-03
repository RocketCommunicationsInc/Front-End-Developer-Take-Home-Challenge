import { Pipe, PipeTransform } from '@angular/core';

/**
 * A pipe used to capitalize a string (word).
 */
@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }
    const capitalizedString: string = value.charAt(0).toUpperCase() +
      value.slice(1);
    return capitalizedString;
  }
}
