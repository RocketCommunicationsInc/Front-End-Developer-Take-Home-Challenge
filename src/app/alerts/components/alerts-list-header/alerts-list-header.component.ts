import { Component, Input, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { AlertsState } from '@grmAlerts/alerts.state'
import { sortAlerts, toggleSelectAll } from '@grmAlerts/alerts.actions'
import { Alert } from '@grmAlerts/alerts.model'

@Component({
  selector: 'grm-alerts-list-header',
  template: '<grm-alerts-list-header-display [alerts]="alerts"></grm-alerts-list-header-display>'
})
export class AlertsListHeaderComponent implements OnInit {
  @Input() alerts: Alert[] | null

  constructor() { }
  ngOnInit(): void { }
}

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

  tapSelectAll($event: any) {
    $event.preventDefault()
    this.store.dispatch(toggleSelectAll())
  }

  tapSort($event: any, column: string): void {
    $event.preventDefault()
    this.store.dispatch(sortAlerts({column}))
  }
}
