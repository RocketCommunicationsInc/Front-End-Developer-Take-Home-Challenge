import { ActionReducer, createReducer, on } from '@ngrx/store'
import { FetchStatus } from '@grmCommon/enums/status.enums'
import { fetchAlertsFailure, fetchAlertsSuccess, addActiveAlert, removeActiveAlert, addSelectedAlert,
  removeSelectedAlert, sortAlerts, toggleSelectAll, fetchAlerts } from '@grmAlerts/alerts.actions'
import { AlertsState, defaultAlertsState } from '@grmAlerts/alerts.state'

export const alertsReducers: ActionReducer<AlertsState> = createReducer(
  defaultAlertsState,
  on(fetchAlerts, (state: AlertsState, { }) => ({
    ...state,
    fetchStatus: FetchStatus.fetching
  })),
  on(fetchAlertsSuccess, (state: AlertsState, { alerts }) => ({
    ...state,
    alerts,
    fetchStatus: FetchStatus.fetchSuccess
  })),
  on(fetchAlertsFailure, (state, { error, message }) => ({
    ...state,
    error,
    errorMessage: message,
    fetchStatus: FetchStatus.fetchFailed
  })),
  on(addActiveAlert, (state, { errorId }) => ({
    ...state,
    activeAlerts: state.activeAlerts.concat(errorId)
  })),
  on(removeActiveAlert, (state, { errorId }) => ({
    ...state,
    activeAlerts: state.activeAlerts.filter(_errorId => _errorId !== errorId)
  })),
  on(addSelectedAlert, (state, { errorId }) => ({
    ...state,
    selectedAlerts: state.selectedAlerts.concat(errorId)
  })),
  on(removeSelectedAlert, (state, { errorId }) => ({
    ...state,
    selectedAlerts: state.selectedAlerts.filter(_errorId => _errorId !== errorId)
  })),
  on(sortAlerts, (state, { column }) => ({
    ...state,
    sortColumn: column,
    sortDirection: (state.sortDirection === 'desc') ? 'asc' : 'desc'
  })),
  on(toggleSelectAll, (state) => ({
    ...state,
    selectedAlerts: (state.selectedAlerts.length === state.alerts.length) ? [] : state.alerts.map(alert => alert.errorId)
  }))
)
