import { Pipe, PipeTransform } from '@angular/core'
import { SortDirection } from '@grmCommon/enums/sort.enums'
import { Alert } from '@grmAlerts/alerts.model'

/**
 * A pipe that sorts the Alert list by a given column name and direction
 *
 * @example alerts | alertSort:'errorCategory':'asc'
 */
@Pipe({
  name: 'alertSort'
})
export class AlertSortPipe implements PipeTransform {
  transform(alerts: any[] | null, column: string | null, direction: string | null): Alert[] {
    if (!alerts) {
      return []
    }

    if (!column) {
      return alerts
    }

    // Create a copy and sort it
    return alerts.slice().sort((a, b) => {
      const column1: any = a[column].toLowerCase()
      const column2: any = b[column].toLowerCase()
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
