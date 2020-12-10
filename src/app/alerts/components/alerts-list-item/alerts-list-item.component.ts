import { Component, Input, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { toggleActiveAlert, toggleSelectedAlert } from '../../alerts.actions'
import { Alert } from '../../alerts.model'
import { AlertsState, isActiveAlertSelector, isSelectedAlertSelector } from '../../alerts.state'

@Component({
  selector: 'grm-alerts-list-item',
  template: '<grm-alerts-list-item-display [alert]="alert" [active]="active$ | async" ' +
    '[selected]="selected$ | async"></grm-alerts-list-item-display>'
})
export class AlertsListItemComponent implements OnInit {
  @Input() alert: Alert | null = null

  active$!: Observable<boolean>
  selected$!: Observable<boolean>

  constructor(
    private store: Store<AlertsState>
  ) { }

  ngOnInit(): void {
    this.active$ = this.store.select(isActiveAlertSelector, {errorId: this.alert?.errorId})
    this.selected$ = this.store.select(isSelectedAlertSelector, {errorId: this.alert?.errorId})
  }
}

@Component({
  selector: 'grm-alerts-list-item-display',
  templateUrl: './alerts-list-item.component.html',
  styleUrls: ['./alerts-list-item.component.scss']
})
export class AlertsListItemDisplayComponent implements OnInit {
  @Input() alert: Alert | null = null
  @Input() active: boolean | null = false
  @Input() selected: boolean | null = false

  constructor(
    private store: Store<AlertsState>
  ) { }

  ngOnInit(): void { }

  getAlertId(alert: Alert): string {
    return `alert${alert.errorId}`
  }

  tapTogglelAlertRow($event: any, alert: Alert): void {
    $event.preventDefault()
    $event.stopPropagation()
    this.store.dispatch(toggleActiveAlert({alert}))
  }

  tapToggleSelectedAlertRow($event: any, alert: Alert) {
    $event.preventDefault()
    $event.stopPropagation()
    this.store.dispatch(toggleSelectedAlert({alert}))
  }
}
