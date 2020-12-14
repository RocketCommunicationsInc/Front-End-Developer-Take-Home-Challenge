import { Injectable } from '@angular/core'
import { interval, of } from 'rxjs'
import { map, catchError, mergeMap, withLatestFrom, switchMap } from 'rxjs/operators'
import { Store } from '@ngrx/store'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { fetchAlerts, fetchAlertsFailure, fetchAlertsSuccess, toggleActiveAlert, addActiveAlert,
  removeActiveAlert, toggleSelectedAlert, removeSelectedAlert, addSelectedAlert, enableAlertsTester,
  addAlerts } from '@grmAlerts/alerts.actions'
import { AlertsService } from '@grmAlerts/alerts.service'
import { Alert } from '@grmAlerts/alerts.model'
import { activeAlertsSelector, alertsSelector, AlertsState, selectedAlertsSelector } from '@grmAlerts/alerts.state'
import { randomBetween } from '@grmCommon/utils/rand.utils'

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
  toggleActiveAlert$ = createEffect((): any => this.actions$
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
  toggleSelectedAlert$ = createEffect((): any => this.actions$
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

  /**
   * Enables the random alert tester.
   * This helps to demonstrate how the observables work.
   */
  enableAlertsTester$ = createEffect((): any => this.actions$
    .pipe(
      ofType(enableAlertsTester),
      switchMap((action) => interval(action.interval)
        .pipe(
          withLatestFrom(this.store.select(alertsSelector)),
          map((alerts) => {
            const alertList: Alert[] = []

            if (alerts) {
              const newAlertCount: number = randomBetween(1, 10)
              for (let i = 0; i < newAlertCount; i++) {
                const randomAlert: number = Math.floor(Math.random() * alerts.length)
                alertList.push(alerts[randomAlert])
              }
            }

            return addAlerts({alerts: alertList})
          })
        )
      )
    )
  )

  constructor(
    private actions$: Actions,
    private store: Store<AlertsState>,
    private alertsService: AlertsService
  ) { }
}
