import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import { RocketAppRoutes } from './rocket.routes';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactsComponent } from './dashboard/components/contacts/contacts.component';
import { AlertsComponent } from './dashboard/components/alerts/alerts.component';
import { SortDirective } from 'src/app/directive/sort.directive';
import { ChartsComponent } from './dashboard/components/charts/charts.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ContactsComponent,
    AlertsComponent,
    SortDirective,
    ChartsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(RocketAppRoutes),
  ],
  providers: [],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
