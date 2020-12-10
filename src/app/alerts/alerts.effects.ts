import { Injectable } from '@angular/core'
import { of } from 'rxjs'
import { map, catchError, mergeMap, withLatestFrom } from 'rxjs/operators'
import { Store } from '@ngrx/store'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { fetchAlerts, fetchAlertsFailure, fetchAlertsSuccess, toggleActiveAlert, addActiveAlert,
  removeActiveAlert, toggleSelectedAlert, removeSelectedAlert, addSelectedAlert } from '@grmAlerts/alerts.actions'
import { AlertsService } from '@grmAlerts/alerts.service'
import { Alert } from '@grmAlerts/alerts.model'
import { activeAlertsSelector, AlertsState, selectedAlertsSelector } from '@grmAlerts/alerts.state'

/**
 * The alerts effects
 */
@Injectable()
export class AlertsEffects {
  /**
   * Fetches the alerts
   */
  fetchAlerts$ = createEffect((): any => this.actions$
    .pipe(
      ofType(fetchAlerts),
      mergeMap((action) => this.alertsService.loadAlerts()
        .pipe(
          map((data: Alert[]) => fetchAlertsSuccess({ alerts: data })),
          catchError(error => of(fetchAlertsFailure({
            error,
            message: 'Unable to fetch alerts, please try again'
          })))
        )
      )
    )
  )

  /**
   * Toggles an active alert
   */
  toggleActiveAlert$ = createEffect((): any =>this.actions$
    .pipe(
      ofType(toggleActiveAlert),
      withLatestFrom(this.store.select(activeAlertsSelector)),
      map(([action, activeAlerts]) => {
        const activeAlert: Alert = activeAlerts.find((errorId: any) => action.alert.errorId === errorId)
        if (activeAlert) {
          return removeActiveAlert({errorId: action.alert.errorId})
        }

        return addActiveAlert({errorId: action.alert.errorId})
      })
    )
  )

  /**
   * Toggles a selected alert
   */
  toggleSelectedAlert$ = createEffect((): any =>this.actions$
    .pipe(
      ofType(toggleSelectedAlert),
      withLatestFrom(this.store.select(selectedAlertsSelector)),
      map(([action, selectedAlerts]) => {
        const selectedAlert: Alert = selectedAlerts.find((errorId: any) => action.alert.errorId === errorId)
        if (selectedAlert) {
          return removeSelectedAlert({errorId: action.alert.errorId})
        }

        return addSelectedAlert({errorId: action.alert.errorId})
      })
    )
  )

  constructor(
    private actions$: Actions,
    private store: Store<AlertsState>,
    private alertsService: AlertsService
  ) { }
}
