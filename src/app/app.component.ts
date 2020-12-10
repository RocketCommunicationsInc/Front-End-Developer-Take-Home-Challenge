import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { fetchAlerts } from './alerts/alerts.actions'
import { setTitle } from './app.actions'
import { AppState, pageTitleSelector } from './app.state'
import { fetchContacts } from './contacts/contacts.actions'

@Component({
  selector: 'grm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // Example: <div [innerHtml]="title" *ngIf="(title$ | async) as title"></div>
  title$: Observable<string[]> = this.store.select(pageTitleSelector)

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(setTitle({title: ['GRM Dashboard']}))
    this.store.dispatch(fetchContacts())
    this.store.dispatch(fetchAlerts())
  }
}
