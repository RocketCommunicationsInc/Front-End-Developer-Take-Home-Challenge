import { createAction, props } from '@ngrx/store'
import { Alert } from '@grmAlerts/alerts.model'

export const fetchAlerts = createAction(
  '[Alerts] Fetch Alerts'
)

export const fetchAlertsSuccess = createAction(
  '[Alerts] Fetch Alerts Success',
  props<{ alerts: Alert[] }>()
)

export const fetchAlertsFailure = createAction(
  '[Alerts] Fetch Alerts Failure',
  props<{ error: any; message: string }>()
)

export const toggleActiveAlert = createAction(
  '[Alerts] Toggle Active Alert',
  props<{ alert: Alert }>()
)

export const addActiveAlert = createAction(
  '[Alerts] Add Active Alert',
  props<{ errorId: string }>()
)

export const removeActiveAlert = createAction(
  '[Alerts] Remove Active Alert',
  props<{ errorId: string }>()
)

export const toggleSelectedAlert = createAction(
  '[Alerts] Toggle Selected Alert',
  props<{ alert: Alert }>()
)

export const addSelectedAlert = createAction(
  '[Alerts] Add Selected Alert',
  props<{ errorId: string }>()
)

export const removeSelectedAlert = createAction(
  '[Alerts] Remove Selected Alert',
  props<{ errorId: string }>()
)

export const sortAlerts = createAction(
  '[Alerts] Sort Alerts',
  props<{ column: string }>()
)

export const toggleSelectAll = createAction(
  '[Alerts] Toggle Select All'
)
