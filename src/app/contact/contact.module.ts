import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { ContactMapComponent } from './contact-map/contact-map.component';
import { SharedModule } from '../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ContactsTableComponent } from './contacts-table/contacts-table.component';
import { ContactStatusComponent } from './contact-status/contact-status.component';



@NgModule({
  declarations: [ContactMapComponent, ContactsTableComponent, ContactStatusComponent],
  imports: [
    SharedModule,
    GoogleMapsModule,
    NgxPaginationModule
  ],
  exports: [ContactMapComponent, ContactsTableComponent]
})
export class ContactModule { }
