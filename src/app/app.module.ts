import { BrowserModule } from '@angular/platform-browser'
import { NgModule,APP_INITIALIZER } from '@angular/core'
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { of, Observable, ObservableInput } from 'rxjs'
import { map, catchError } from 'rxjs/operators'

import { AppRoutingModule } from './app-routing.module'
import { MaterialModule } from './material.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ConfigService } from './shared/config.service'
import { HeaderComponent } from './header/header.component'
import { ContactsComponent } from './contacts/contacts.component'
import { AlertsComponent } from './alerts/alerts.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { IntroComponent } from './intro/intro.component'

function loadConfig(http: HttpClient, config: ConfigService) {
  return (): Promise<boolean> => {
    return new Promise<boolean>((resolve: (a: boolean) => void): void => {
       http.get('/assets/config.json')
         .pipe(
           map((x: ConfigService) => {
             config.alertsAPI = x.alertsAPI
             config.contactsAPI = x.contactsAPI
             resolve(true)
           }),
           catchError((x: { status: number }, caught: Observable<void>): ObservableInput<{}> => {
             if (x.status !== 404) {
               resolve(false)
             }
             resolve(true)
             return of({})
           })
         ).subscribe();
    })
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsComponent,
    AlertsComponent,
    PageNotFoundComponent,
    IntroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      deps: [
        HttpClient,
        ConfigService
      ],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
