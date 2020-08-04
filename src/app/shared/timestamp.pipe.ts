import { Pipe, PipeTransform } from '@angular/core';
import format from 'date-fns/format';

@Pipe({
  name: 'timestamp'
})
export class TimestampPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    return format(new Date(value), 'HH:mm:ss');
  }
}
