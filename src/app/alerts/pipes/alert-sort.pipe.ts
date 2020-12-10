import { Pipe, PipeTransform } from '@angular/core'
import { Alert } from '../alerts.model'

@Pipe({
  name: 'alertSort'
})
export class AlertSortPipe implements PipeTransform {
  transform(alerts: any[] | null, column: string | null, direction: string | null): Alert[] | null {
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
        return (direction === 'desc') ? 1 : -1
      }

      if (column1 < column2) {
        return (direction === 'desc') ? -1 : 1
      }

      return 0
    })
  }
}
