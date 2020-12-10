import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { setTitle } from '@grm/app.actions'
import { AppState, pageTitleSelector } from '@grm/app.state'
import { fetchAlerts } from '@grmAlerts/alerts.actions'
import { fetchContacts } from '@grmContacts/contacts.actions'

/**
 * GRM application component
 *
 * @example <grm-root></grm-root>
 */
@Component({
  selector: 'grm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // @example <div [innerHtml]="title" *ngIf="(title$ | async) as title"></div>
  title$: Observable<string[]> = this.store.select(pageTitleSelector)

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(setTitle({title: ['GRM Dashboard']}))
    this.store.dispatch(fetchAlerts())
    this.store.dispatch(fetchContacts())
  }
}
