import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { storeLogger } from 'ngrx-store-logger'
import { localStorageSync } from 'ngrx-store-localstorage'
import { FlexLayoutModule } from '@angular/flex-layout'
import { AppRoutingModule } from '@grm/app-routing.module'
import { AppComponent } from '@grm/app.component'
import { AppEffects } from '@grm/app.effects'
import { appReducers } from '@grm/app.reducer'
import { defaultAppState } from '@grm/app.state'
import { AlertsModule } from '@grmAlerts/alerts.module'
import { ContactsModule } from '@grmContacts/contacts.module'
import { FormatGRMTimePipe } from '@grmCommon/pipes/format-time.pipe'
import { environment } from 'src/environments/environment'
import '@astrouxds/rux-global-status-bar'
import '@astrouxds/rux-clock'

// Setup the ngrx store logger
export const logger = (reducer: ActionReducer<any>) => storeLogger()(reducer)

// Setup the ngrx local storage sync
export const localStorageSyncReducer = (reducer: ActionReducer<any>) => localStorageSync({
  keys: [
    {
      alerts: [
        'activeAlerts',
        'selectedAlerts',
        'sortColumn',
        'sortDirection',
        'selectedSeverity',
        'selectedCategory'
      ]
    },
    {
      contacts: [
        'activeContacts',
        'sortColumn',
        'sortDirection',
        'selectedStatus'
      ]
    }
  ],
  rehydrate: true
})(reducer)

// Setup the ngrx metadata reducers
export const metaReducers: MetaReducer<any>[] = [localStorageSyncReducer]

if (!environment.production) {
  metaReducers.push(logger)
}

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({
      app: appReducers
    }, {
      initialState: defaultAppState,
      metaReducers
    }),
    EffectsModule.forRoot([
      AppEffects
    ]),
    FlexLayoutModule,
    AlertsModule,
    ContactsModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    FormatGRMTimePipe
  ],
  bootstrap: [
    AppComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
