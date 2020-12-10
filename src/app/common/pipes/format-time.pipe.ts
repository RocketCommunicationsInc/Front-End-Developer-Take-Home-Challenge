import { Pipe, PipeTransform } from '@angular/core'
import * as moment from 'moment'

/**
 * A pipe that formats a unix timestamp
 *
 * @example time | formatGRMTime
 */
@Pipe({
  name: 'formatGRMTime'
})
export class FormatGRMTimePipe implements PipeTransform {
  transform(value: number): string {
    return moment(value, 'x').format('hh:mm:ss')
  }
}
