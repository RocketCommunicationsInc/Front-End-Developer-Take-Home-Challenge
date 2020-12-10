import { Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { Alert } from '@grmAlerts/alerts.model'
import { AlertsState, alertsSelector, sortColumnSelector, sortDirectionSelector, fetchStatusSelector,
  errorMessageSelector } from '@grmAlerts/alerts.state'
import { FetchStatus } from '@grmCommon/enums/status.enums'
import { AppState } from '@grm/app.state'
import { fetchAlerts } from '@grmAlerts/alerts.actions'

@Component({
  selector: 'grm-alerts-list',
  template: '<grm-alerts-list-display fxFlex [alerts]="alerts$ | async" [sortColumn]="sortColumn$ | async" ' +
    '[sortDirection]="sortDirection$ | async" [fetchStatus]="fetchStatus$ | async"' +
    '[errorMessage]="errorMessage$ | async"></grm-alerts-list-display>'
})
export class AlertsListComponent implements OnInit {
  alerts$: Observable<Alert[]> = this.store.select(alertsSelector)
  sortColumn$: Observable<string> = this.store.select(sortColumnSelector)
  sortDirection$: Observable<string> = this.store.select(sortDirectionSelector)
  fetchStatus$: Observable<string> = this.store.select(fetchStatusSelector)
  errorMessage$: Observable<string> = this.store.select(errorMessageSelector)

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
export class AlertsListDisplayComponent implements OnInit, OnChanges {
  @Input() alerts: Alert[] | null = []
  @Input() sortColumn: string | null = ''
  @Input() sortDirection: string | null = ''
  @Input() fetchStatus: string | null = FetchStatus.fetching
  @Input() errorMessage: string | null = ''

  @ViewChild('alertsFetching') public alertsFetchingTemplateRef!: TemplateRef<any>
  @ViewChild('alertsSuccess') public alertsSuccessTemplateRef!: TemplateRef<any>
  @ViewChild('alertsFailed') public alertsFailedTemplateRef!: TemplateRef<any>

  public contentTemplate!: TemplateRef<any>

  constructor(
    private appStore: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.contentTemplate = this.alertsFetchingTemplateRef
  }

  // This is used to get around the dreaded ExpressionChangedAfterItHasBeenCheckedError
  ngOnChanges(changes: SimpleChanges): void {
    if ('fetchStatus' in changes) {
      switch (changes.fetchStatus.currentValue) {
        case FetchStatus.fetchSuccess:
          this.contentTemplate = this.alertsSuccessTemplateRef
          break

        case FetchStatus.fetchFailed:
          this.contentTemplate = this.alertsFailedTemplateRef
          break

        case FetchStatus.fetching:
        default:
          this.contentTemplate = this.alertsFetchingTemplateRef
          break
      }
    }
  }

  tapRetry($event: any): void {
    $event.preventDefault()
    this.appStore.dispatch(fetchAlerts())
  }
}
