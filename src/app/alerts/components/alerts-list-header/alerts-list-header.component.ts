import { Component, Input, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { AlertsState } from '@grmAlerts/alerts.state'
import { sortAlerts, toggleSelectAll } from '@grmAlerts/alerts.actions'
import { Alert } from '@grmAlerts/alerts.model'

/**
 * GRM Alerts List Header component
 * @example <grm-alerts-list-header [alerts]="alerts"></grm-alerts-list-header>
 */
@Component({
  selector: 'grm-alerts-list-header',
  template: '<grm-alerts-list-header-display [alerts]="alerts"></grm-alerts-list-header-display>'
})
export class AlertsListHeaderComponent implements OnInit {
  @Input() alerts: Alert[] | null

  constructor() { }
  ngOnInit(): void { }
}

/**
 * GRM Alerts List Header display component
 * @example <grm-alerts-list-header-display [alerts]="alerts"></grm-alerts-list-header-display>
 */
@Component({
  selector: 'grm-alerts-list-header-display',
  templateUrl: './alerts-list-header.component.html',
  styleUrls: ['./alerts-list-header.component.scss']
})
export class AlertsListHeaderDisplayComponent implements OnInit {
  @Input() alerts: Alert[] | null

  constructor(
    private store: Store<AlertsState>
  ) { }

  ngOnInit(): void { }

  /**
   * Handles the select all tap
   * @param $event
   */
  tapSelectAll($event: any) {
    $event.preventDefault()
    this.store.dispatch(toggleSelectAll())
  }

  /**
   * Handles the sort tap
   * @param $event
   * @param column
   */
  tapSort($event: any, column: string): void {
    $event.preventDefault()
    this.store.dispatch(sortAlerts({column}))
  }
}
