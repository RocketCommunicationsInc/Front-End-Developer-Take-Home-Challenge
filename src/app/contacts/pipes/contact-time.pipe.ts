import { Pipe, PipeTransform } from '@angular/core'
import * as moment from 'moment'

@Pipe({
  name: 'contactTime'
})
export class ContactTimePipe implements PipeTransform {
  transform(value: number): string {
    return moment(value, 'x').format('hh:mm:ss')
  }
}
