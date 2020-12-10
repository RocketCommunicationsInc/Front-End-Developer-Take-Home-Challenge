import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { storeLogger } from 'ngrx-store-logger'
import { localStorageSync } from 'ngrx-store-localstorage'
import { FlexLayoutModule } from '@angular/flex-layout'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AppEffects } from './app.effects'
import { appReducers } from './app.reducer'
import { defaultAppState } from './app.state'
import { AlertsModule } from './alerts/alerts.module'
import { ContactsModule } from './contacts/contacts.module'
import { FormatGRMTimePipe } from './common/pipes/format-time.pipe'
import { environment } from 'src/environments/environment'
import '@astrouxds/rux-global-status-bar'
import '@astrouxds/rux-clock'

export const logger = (reducer: ActionReducer<any>) => storeLogger()(reducer)
export const localStorageSyncReducer = (reducer: ActionReducer<any>) => localStorageSync({
  keys: [
    'app',
    'alerts',
    'contacts'
  ],
  rehydrate: true
})(reducer)

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
