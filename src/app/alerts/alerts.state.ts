import { Alert } from '@grmAlerts/alerts.model'

/**
 * The alerts state
 */
export class AlertsState {
  alerts: Alert[]
  activeAlerts: string[]
  selectedAlerts: string[]
  sortColumn?: string
  sortDirection: string
  currentPage: number
  fetchStatus?: string
  error?: any
  errorMessage?: string
}

/**
 * The default alerts state
 */
export const defaultAlertsState: AlertsState = {
  alerts: [],
  activeAlerts: [],
  selectedAlerts: [],
  sortDirection: 'desc',
  currentPage: 0
}

// Selectors
export const alertsSelector = (state: any) => state.alerts.alerts
export const activeAlertsSelector = (state: any) => state.alerts.activeAlerts
export const isActiveAlertSelector = (state: any, props: any) => state.alerts ? state.alerts.activeAlerts
  .find((errorId: string) => errorId === props.errorId) : false

export const selectedAlertsSelector = (state: any) => state.alerts.selectedAlerts
export const isSelectedAlertSelector = (state: any, props: any) => state.alerts ? state.alerts.selectedAlerts
  .find((errorId: string) => errorId === props.errorId) : false

export const sortColumnSelector = (state: any) => state.alerts.sortColumn
export const sortDirectionSelector = (state: any) => state.alerts.sortDirection
export const currentPageSelector = (state: any) => state.alerts.currentPage
export const fetchStatusSelector = (state: any) => state.alerts.fetchStatus
export const errorMessageSelector = (state: any) => state.alerts.errorMessage
