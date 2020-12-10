import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { toggleActiveAlert, toggleSelectedAlert } from '@grmAlerts/alerts.actions'
import { Alert } from '@grmAlerts/alerts.model'
import { AlertsState, isActiveAlertSelector, isSelectedAlertSelector } from '@grmAlerts/alerts.state'

/**
 * GRM Alert List Item component
 *
 * @example <grm-alerts-list-item [alert]="alert"></grm-alerts-list-item>
 */
@Component({
  selector: 'grm-alerts-list-item',
  template: '<grm-alerts-list-item-display [alert]="alert" [active]="active$ | async" ' +
    '[selected]="selected$ | async" (toggleActiveAlert)="toggleActiveAlert($event)" ' +
    '(toggleSelectedAlert)="toggleSelectedAlert($event)"></grm-alerts-list-item-display>'
})
export class AlertsListItemComponent implements OnInit {
  @Input() alert: Alert | null = null

  active$: Observable<boolean>
  selected$: Observable<boolean>

  constructor(
    private store: Store<AlertsState>
  ) { }

  ngOnInit(): void {
    this.active$ = this.store.select(isActiveAlertSelector, {errorId: this.alert?.errorId})
    this.selected$ = this.store.select(isSelectedAlertSelector, {errorId: this.alert?.errorId})
  }

  /**
   * Toggles an active alert
   *
   * @param alert
   */
  toggleActiveAlert(alert: Alert): void {
    this.store.dispatch(toggleActiveAlert({alert}))
  }

  /**
   * Toggles a selected alert
   *
   * @param alert
   */
  toggleSelectedAlert(alert: Alert): void {
    this.store.dispatch(toggleSelectedAlert({alert}))
  }
}

/**
 * GRM Alert List Item display component
 *
 * @example <grm-alerts-list-item-display [alert]="alert"></grm-alerts-list-item-display>
 */
@Component({
  selector: 'grm-alerts-list-item-display',
  templateUrl: './alerts-list-item.component.html',
  styleUrls: ['./alerts-list-item.component.scss']
})
export class AlertsListItemDisplayComponent implements OnInit {
  @Input() alert: Alert | null
  @Input() active: boolean | null
  @Input() selected: boolean | null

  @Output() toggleActiveAlert: EventEmitter<Alert> = new EventEmitter<Alert>()
  @Output() toggleSelectedAlert: EventEmitter<Alert> = new EventEmitter<Alert>()

  constructor() { }
  ngOnInit(): void { }

  /**
   * Gets an alert id used by the checkboxes
   *
   * @param alert
   */
  getAlertId(alert: Alert): string {
    return `alert${alert.errorId}`
  }

  /**
   * Handles the alert row tap
   *
   * @param $event
   * @param alert
   */
  tapTogglelAlertRow($event: any, alert: Alert): void {
    $event.preventDefault()
    $event.stopPropagation()
    this.toggleActiveAlert.emit(alert)
  }

  /**
   * Handles the alert checkbox tap
   *
   * @param $event
   * @param alert
   */
  tapToggleSelectedAlertRow($event: any, alert: Alert) {
    $event.preventDefault()
    $event.stopPropagation()
    this.toggleSelectedAlert.emit(alert)
  }
}
