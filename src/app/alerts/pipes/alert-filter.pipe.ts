import { Pipe, PipeTransform } from '@angular/core'
import { Alert } from '@grmAlerts/alerts.model'
import { getFilteredAlerts } from '@grmAlerts/alerts.utils'

/**
 * A pipe that filters the Alert list by severity and/or category
 *
 * @example alerts | alertFilter:'caution':'software'
 */
@Pipe({
  name: 'alertFilter'
})
export class AlertFilterPipe implements PipeTransform {
  transform(alerts: any[] | null, severityFilter: string | null, categoryFilter: string | null): Alert[] {
    if (!alerts) {
      return []
    }

    return getFilteredAlerts(alerts, severityFilter, categoryFilter)
  }
}
