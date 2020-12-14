import { ActionReducer, createReducer, on } from '@ngrx/store'
import { FetchStatus } from '@grmCommon/enums/status.enums'
import { fetchAlertsFailure, fetchAlertsSuccess, addActiveAlert, removeActiveAlert, addSelectedAlert,
  removeSelectedAlert, sortAlerts, toggleSelectAll, fetchAlerts, addAlerts, saveCurrentPage, selectedSeverity,
  selectedCategory } from '@grmAlerts/alerts.actions'
import { AlertsState, defaultAlertsState } from '@grmAlerts/alerts.state'
import { SortDirection } from '@grmCommon/enums/sort.enums'

/**
 * The alerts reducer
 */
export const alertsReducers: ActionReducer<AlertsState> = createReducer(
  defaultAlertsState,
  on(fetchAlerts, (state: AlertsState, { }) => ({
    ...state,
    fetchStatus: FetchStatus.fetching
  })),
  on(fetchAlertsSuccess, (state: AlertsState, { alerts }) => {
    // Build the severity list and filter the duplicates
    let severityList: string[] = alerts.map(alert => alert.errorSeverity)
    severityList = severityList.filter((severity, index) => severityList.indexOf(severity) === index)

    // Build the category list and filter the duplicates
    let categoryList: string[] = alerts.map(alert => alert.errorCategory)
    categoryList = categoryList.filter((severity, index) => categoryList.indexOf(severity) === index)

    return ({
      ...state,
      alerts,
      severityList,
      categoryList,
      fetchStatus: FetchStatus.fetchSuccess
    })
  }),
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
    sortDirection: (state.sortDirection === SortDirection.desc) ? SortDirection.asc : SortDirection.desc
  })),
  on(toggleSelectAll, (state) => ({
    ...state,
    selectedAlerts: (state.selectedAlerts.length === state.alerts.length) ? [] : state.alerts.map(alert => alert.errorId)
  })),
  on(addAlerts, (state, { alerts }) => ({
    ...state,
    alerts: state.alerts?.concat(alerts)
  })),
  on(saveCurrentPage, (state, { page }) => ({
    ...state,
    currentPage: page
  })),
  on(selectedSeverity, (state, { severity }) => ({
    ...state,
    selectedSeverity: severity
  })),
  on(selectedCategory, (state, { category }) => ({
    ...state,
    selectedCategory: category
  }))
)
