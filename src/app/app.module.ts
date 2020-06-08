import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
//All materials in module
import { MaterialModule } from "./material/material.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//
import { HttpErrorHandler } from './http-error-handler.service';
import { ContactsComponent } from './dashboard/contacts.component';
import { AlertsComponent } from './dashboard/alerts.component';
//
import { ChartsModule } from 'ng2-charts';
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ContactsComponent,
    AlertsComponent,
    TruncatePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ChartsModule,
  ],
  providers: [
    HttpErrorHandler,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
