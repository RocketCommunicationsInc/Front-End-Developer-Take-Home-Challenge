import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { AlertsState, currentPageSelector } from '@grmAlerts/alerts.state'
import { saveCurrentPage, sortAlerts, toggleSelectAll } from '@grmAlerts/alerts.actions'
import { Alert } from '@grmAlerts/alerts.model'

/**
 * GRM Alerts List Header component
 *
 * @example <grm-alerts-list-header [alerts]="alerts"></grm-alerts-list-header>
 */
@Component({
  selector: 'grm-alerts-list-header',
  template: '<grm-alerts-list-header-display [alerts]="alerts" (toggleSelectAll)="toggleSelectAll()" ' +
    '(sortAlerts)="sortAlerts($event)" (saveCurrentPage)="saveCurrentPage($event)"></grm-alerts-list-header-display>'
})
export class AlertsListHeaderComponent implements OnInit {
  @Input() alerts: Alert[] | null

  currentPage$: Observable<number> = this.store.select(currentPageSelector)

  constructor(
    private store: Store<AlertsState>
  ) { }

  ngOnInit(): void { }

  /**
   * Toggles the select all
   */
  toggleSelectAll(): void {
    this.store.dispatch(toggleSelectAll())
  }

  /**
   * Sorts the alerts by column
   *
   * @param column
   */
  sortAlerts(column: string): void {
    this.store.dispatch(sortAlerts({column}))
  }

  /**
   * Saves the current page
   *
   * @param page
   */
  saveCurrentPage(page: number): void {
    this.store.dispatch(saveCurrentPage({page}))
  }
}

/**
 * GRM Alerts List Header display component
 *
 * @example <grm-alerts-list-header-display [alerts]="alerts"></grm-alerts-list-header-display>
 */
@Component({
  selector: 'grm-alerts-list-header-display',
  templateUrl: './alerts-list-header.component.html',
  styleUrls: ['./alerts-list-header.component.scss']
})
export class AlertsListHeaderDisplayComponent implements OnInit {
  @Input() alerts: Alert[] | null

  @Output() toggleSelectAll: EventEmitter<void> = new EventEmitter<void>()
  @Output() sortAlerts: EventEmitter<string> = new EventEmitter<string>()
  @Output() saveCurrentPage: EventEmitter<number> = new EventEmitter<number>()

  constructor() { }
  ngOnInit(): void { }

  /**
   * Handles the select all tap
   *
   * @param $event
   */
  tapSelectAll($event: any) {
    $event.preventDefault()
    this.toggleSelectAll.emit()
  }

  /**
   * Handles the sort tap
   *
   * @param $event
   * @param column
   */
  tapSort($event: any, column: string): void {
    $event.preventDefault()
    this.sortAlerts.emit(column)
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
