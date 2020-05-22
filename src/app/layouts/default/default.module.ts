import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { ContactsComponent } from '../../pages/contacts/contacts.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../components/shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AlertsComponent } from '../../pages/alerts/alerts.component';

/*
Default module which pulls in routes for main content
*/

@NgModule({
  declarations: [
      DefaultComponent,
      ContactsComponent,
      AlertsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule
  ]
})
export class DefaultModule { }
