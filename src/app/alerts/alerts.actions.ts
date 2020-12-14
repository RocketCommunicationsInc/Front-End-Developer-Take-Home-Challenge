import { createAction, props } from '@ngrx/store'
import { Alert } from '@grmAlerts/alerts.model'

/**
 * The fetch alerts action
 */
export const fetchAlerts = createAction(
  '[Alerts] Fetch Alerts'
)

/**
 * The fetch alerts success action
 */
export const fetchAlertsSuccess = createAction(
  '[Alerts] Fetch Alerts Success',
  props<{ alerts: Alert[] }>()
)

/**
 * The fetch alerts failure action
 */
export const fetchAlertsFailure = createAction(
  '[Alerts] Fetch Alerts Failure',
  props<{ error: any; message: string }>()
)

/**
 * The toggle active alert action
 */
export const toggleActiveAlert = createAction(
  '[Alerts] Toggle Active Alert',
  props<{ alert: Alert }>()
)

/**
 * The add active alert action
 */
export const addActiveAlert = createAction(
  '[Alerts] Add Active Alert',
  props<{ errorId: string }>()
)

/**
 * The remove active alert action
 */
export const removeActiveAlert = createAction(
  '[Alerts] Remove Active Alert',
  props<{ errorId: string }>()
)

/**
 * The toggle selected alert action
 */
export const toggleSelectedAlert = createAction(
  '[Alerts] Toggle Selected Alert',
  props<{ alert: Alert }>()
)

/**
 * The add selected alert action
 */
export const addSelectedAlert = createAction(
  '[Alerts] Add Selected Alert',
  props<{ errorId: string }>()
)

/**
 * The remove selected alert action
 */
export const removeSelectedAlert = createAction(
  '[Alerts] Remove Selected Alert',
  props<{ errorId: string }>()
)

/**
 * The sort alerts action
 */
export const sortAlerts = createAction(
  '[Alerts] Sort Alerts',
  props<{ column: string }>()
)

/**
 * The toggle select all action
 */
export const toggleSelectAll = createAction(
  '[Alerts] Toggle Select All'
)

/**
 * The enable alerts tester action
 */
export const enableAlertsTester = createAction(
  '[Alerts] Enable Alerts Tester',
  props<{ interval: number }>()
)

/**
 * The add alerts action
 */
export const addAlerts = createAction(
  '[Alerts] Add Alerts',
  props<{ alerts: Alert[] }>()
)

/**
 * The save current page action
 */
export const saveCurrentPage = createAction(
  '[Alerts] Current Page',
  props<{ page: number }>()
)

/**
 * The selected severity action
 */
export const selectedSeverity = createAction(
  '[Alerts] Selected Severity',
  props<{ severity: string }>()
)

/**
 * The selected category action
 */
export const selectedCategory = createAction(
  '[Alerts] Selected Category',
  props<{ category: string }>()
)
