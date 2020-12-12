import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { Alert } from '@grmAlerts/alerts.model'
import { AlertsState, alertsSelector, sortColumnSelector, sortDirectionSelector, fetchStatusSelector,
  errorMessageSelector, 
  currentPageSelector} from '@grmAlerts/alerts.state'
import { FetchStatus } from '@grmCommon/enums/status.enums'
import { AppState } from '@grm/app.state'
import { fetchAlerts, saveCurrentPage } from '@grmAlerts/alerts.actions'

/**
 * GRM Alerts component
 *
 * @example <grm-alerts-list></grm-alerts-list>
 */
@Component({
  selector: 'grm-alerts-list',
  template: '<grm-alerts-list-display fxFlex [alerts]="alerts$ | async" [sortColumn]="sortColumn$ | async" ' +
    '[sortDirection]="sortDirection$ | async" [currentPage]="currentPage$ | async" [fetchStatus]="fetchStatus$ | async"' +
    '[errorMessage]="errorMessage$ | async" (fetchAlerts)="fetchAlerts()" ' +
    '(saveCurrentPage)="saveCurrentPage($event)"></grm-alerts-list-display>'
})
export class AlertsListComponent implements OnInit {
  alerts$: Observable<Alert[]> = this.alertsStore.select(alertsSelector)
  sortColumn$: Observable<string> = this.alertsStore.select(sortColumnSelector)
  sortDirection$: Observable<string> = this.alertsStore.select(sortDirectionSelector)
  currentPage$: Observable<number> = this.alertsStore.select(currentPageSelector)
  fetchStatus$: Observable<string> = this.alertsStore.select(fetchStatusSelector)
  errorMessage$: Observable<string> = this.alertsStore.select(errorMessageSelector)

  constructor(
    private appStore: Store<AppState>,
    private alertsStore: Store<AlertsState>
  ) { }

  ngOnInit(): void {
    // Use this to enable the alerts tester
    // this.store.dispatch(enableAlertsTester({interval: 20000}))
  }

  /**
   * Fetches the alerts
   */
  fetchAlerts(): void {
    this.appStore.dispatch(fetchAlerts())
  }

  /**
   * Saves the current page
   *
   * @param page
   */
  saveCurrentPage(page: number): void {
    this.appStore.dispatch(saveCurrentPage({page}))
  }
}

/**
 * GRM Alerts display component
 *
 * @example <grm-alerts-list-display [alerts]="alerts$ | async"></grm-alerts-list-display>
 */
@Component({
  selector: 'grm-alerts-list-display',
  templateUrl: './alerts-list.component.html',
  styleUrls: ['./alerts-list.component.scss']
})
export class AlertsListDisplayComponent implements OnInit, OnChanges {
  @Input() alerts: Alert[] | null
  @Input() sortColumn: string | null
  @Input() sortDirection: string | null
  @Input() currentPage: number | null
  @Input() fetchStatus: string | null
  @Input() errorMessage: string | null

  @Output() fetchAlerts: EventEmitter<void> = new EventEmitter<void>()
  @Output() saveCurrentPage: EventEmitter<number> = new EventEmitter<number>()

  @ViewChild('alertsFetching') public alertsFetchingTemplateRef: TemplateRef<any>
  @ViewChild('alertsSuccess') public alertsSuccessTemplateRef: TemplateRef<any>
  @ViewChild('alertsFailed') public alertsFailedTemplateRef: TemplateRef<any>

  public contentTemplate: TemplateRef<any>
  public itemsPerPage: number = 25

  constructor() { }

  ngOnInit(): void {
    this.fetchStatus = FetchStatus.fetching
    this.contentTemplate = this.alertsFetchingTemplateRef
  }

  /**
   * Determines which content template to render based off of the fetch status
   * This is used to get around the dreaded ExpressionChangedAfterItHasBeenCheckedError
   *
   * @param changes
   */
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

  /**
   * Handles the retry tap
   *
   * @param $event
   */
  tapRetry($event: any): void {
    $event.preventDefault()
    this.fetchAlerts.emit()
  }

  /**
   * Sets the current page
   *
   * @param $event
   */
  setCurrentPage($event: any): void  {
    this.saveCurrentPage.emit($event)
  }
}
