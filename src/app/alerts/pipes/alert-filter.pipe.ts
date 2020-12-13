import { Pipe, PipeTransform } from '@angular/core'
import { Alert } from '@grmAlerts/alerts.model'

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

    if (severityFilter && severityFilter.trim().length) {
      alerts = alerts.filter((alert: Alert) => alert.errorSeverity === severityFilter)
    }

    if (categoryFilter && categoryFilter.trim().length) {
      alerts = alerts.filter((alert: Alert) => alert.errorCategory === categoryFilter)
    }

    return alerts
  }
}
