import { SortDirection } from '@grmCommon/enums/sort.enums'
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
  severityList: string[]
  selectedSeverity?: string
  categoryList: string[]
  selectedCategory?: string
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
  sortDirection: SortDirection.desc,
  currentPage: 0,
  severityList: [],
  categoryList: [],
  selectedSeverity: 'all',
  selectedCategory: 'all'
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
export const severityListSelector = (state: any) => state.alerts.severityList
export const selectedSeveritySelector = (state: any) => state.alerts.selectedSeverity
export const categoryListSelector = (state: any) => state.alerts.categoryList
export const selectedCategorySelector = (state: any) => state.alerts.selectedCategory
export const fetchStatusSelector = (state: any) => state.alerts.fetchStatus
export const errorMessageSelector = (state: any) => state.alerts.errorMessage
