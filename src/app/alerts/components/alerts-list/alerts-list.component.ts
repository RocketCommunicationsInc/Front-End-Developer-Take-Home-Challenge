import { Component, Input, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { Alert } from '../../alerts.model'
import { AlertsState, alertsSelector, sortColumnSelector, sortDirectionSelector } from '../../alerts.state'

@Component({
  selector: 'grm-alerts-list',
  template: '<grm-alerts-list-display fxFlex [alerts]="alerts$ | async" [sortColumn]="sortColumn$ | async" ' +
    '[sortDirection]="sortDirection$ | async"></grm-alerts-list-display>'
})
export class AlertsListComponent implements OnInit {
  alerts$: Observable<Alert[]> = this.store.select(alertsSelector)
  sortColumn$: Observable<string> = this.store.select(sortColumnSelector)
  sortDirection$: Observable<string> = this.store.select(sortDirectionSelector)

  constructor(
    private store: Store<AlertsState>
  ) { }

  ngOnInit(): void { }
}

@Component({
  selector: 'grm-alerts-list-display',
  templateUrl: './alerts-list.component.html',
  styleUrls: ['./alerts-list.component.scss']
})
export class AlertsListDisplayComponent implements OnInit {
  @Input() alerts: Alert[] | null = []
  @Input() sortColumn: string | null = ''
  @Input() sortDirection: string | null = ''

  constructor() { }
  ngOnInit(): void { }
}
