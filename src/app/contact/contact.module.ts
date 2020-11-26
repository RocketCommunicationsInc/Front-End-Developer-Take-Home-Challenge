import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { ContactMapComponent } from './contact-map/contact-map.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [ContactMapComponent],
  imports: [
    SharedModule,
    GoogleMapsModule,
  ],
  exports: [ContactMapComponent]
})
export class ContactModule { }
