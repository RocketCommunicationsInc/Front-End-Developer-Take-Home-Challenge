import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ContactsComponent } from './contacts/contacts.component';
import { AlertsComponent } from './alerts/alerts.component';

import { SharedModule } from '../../shared/shared.module';
import { SatellitesComponent } from './satellites/satellites.component';
import { AlertsRowComponent } from './alerts-row/alerts-row.component';
import { ContactsRowComponent } from './contacts-row/contacts-row.component';

@NgModule({
  declarations: [ContactsComponent, AlertsComponent, SatellitesComponent, AlertsRowComponent, ContactsRowComponent],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
  ],
  exports: [SatellitesComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SatellitesModule { }
