import { Component, OnInit } from '@angular/core';
import { Contact } from '../../contacts';

// this is generated each time you use the ng generate component cli command
@Component({
  selector: 'app-contacts', // components css selector
  templateUrl: './contacts.component.html', // the location of the components template
  styleUrls: ['./contacts.component.scss'], // the location of the components private css styles
})

// always export the component class so you can import it elsewhere, like in the AppModule file
export class ContactsComponent implements OnInit {
  contact: Contact = {
    _id: '5c926e56fddac523882598d8',
    contactId: '01bb9a28-7f3a-519c-8b47-0481f946b14a',
    contactStatus: 'normal',
    contactName: 64900,
    contactGround: 'CTS',
    contactSatellite: 'USA-256',
    contactEquipment: 'ANT62 VAFB1 SFEP215CH1 ECEU6 WS388 USP182',
    contactState: 'executing',
    contactStep: 'Critical Health',
    contactDetail:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    contactBeginTimestamp: 1563753600,
    contactEndTimestamp: 1563754620,
    contactLatitude: 6.62334,
    contactLongitude: -50.78854,
    contactAzimuth: 141.771,
    contactElevation: 62.9,
    contactResolution: 'complete',
    contactResolutionStatus: 'normal',
  };

  constructor() {}

  // this is a lifecycle hook, it angular calls it shortly after creating a component.
  // good place for initialization logic
  ngOnInit(): void {}
}
