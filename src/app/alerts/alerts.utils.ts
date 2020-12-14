import { Alert } from '@grmAlerts/alerts.model'

/**
 * Gets the active alerts with optional filters for severity and category
 *
 * @param alerts
 * @param severityFilter
 * @param categoryFilter
 */
export const getFilteredAlerts = (alerts: Alert[] | null, severityFilter: string | null, categoryFilter: string | null) => {
  if (!alerts) {
    return []
  }

  if (severityFilter && severityFilter.trim().length && (severityFilter.trim() !== 'all')) {
    alerts = alerts.filter((alert: Alert) => alert.errorSeverity === severityFilter)
  }

  if (categoryFilter && categoryFilter.trim().length && (categoryFilter.trim() !== 'all')) {
    alerts = alerts.filter((alert: Alert) => alert.errorCategory === categoryFilter)
  }

  return alerts
}

/**
 * Gets the active alerts count with optional filters for severity and category
 *
 * @param alerts
 * @param severityFilter
 * @param categoryFilter
 */
export const getActiveAlertsCount = (alerts: Alert[] | null, severityFilter: string | null, categoryFilter: string | null) =>
  getFilteredAlerts(alerts, severityFilter, categoryFilter).length
