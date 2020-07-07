import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Contact } from '../contact';
// dont think this works
import { CONTACTS } from './mock-contacts';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const contacts = [
      {
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
      },
      {
        _id: '5c926e56fddac523882587bc',
        contactId: '990153da-d6df-5f00-8d8a-283ce2572f2d',
        contactStatus: 'normal',
        contactName: 64646,
        contactGround: 'HTS',
        contactSatellite: 'USA-251',
        contactEquipment: 'ANT142 VAFB1 SFEP128CH1 ECEU6 WS154 USP194',
        contactState: 'executing',
        contactStep: 'Uplink',
        contactDetail:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        contactBeginTimestamp: 1563753780,
        contactEndTimestamp: 1563755760,
        contactLatitude: -65.23842,
        contactLongitude: -87.14638,
        contactAzimuth: -80.308,
        contactElevation: 75.2,
        contactResolution: 'complete',
        contactResolutionStatus: 'normal',
      },
      {
        _id: '5c926e56fddac523882442a8',
        contactId: '21784dc0-07a6-5671-863f-115355f1e1b6',
        contactStatus: 'normal',
        contactName: 34184,
        contactGround: 'DGS',
        contactSatellite: 'USA-166',
        contactEquipment: 'ANT35 VAFB1 SFEP439CH1 ECEU6 WS141 USP296',
        contactState: 'executing',
        contactStep: 'Lock',
        contactDetail:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        contactBeginTimestamp: 1563753780,
        contactEndTimestamp: 1563754740,
        contactLatitude: 14.39669,
        contactLongitude: 37.33636,
        contactAzimuth: 64.28,
        contactElevation: 87.8,
        contactResolution: 'complete',
        contactResolutionStatus: 'normal',
      },
    ];
    return { contacts };
  }
  constructor() {}
  genContactName(contacts: Contact[]): number {
    return contacts.length > 0
      ? Math.max(...contacts.map((contact) => contact.contactName)) + 1
      : 11;
  }
}
