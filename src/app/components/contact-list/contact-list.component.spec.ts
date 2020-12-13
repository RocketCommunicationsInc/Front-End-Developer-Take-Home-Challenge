/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';

import { ContactListComponent } from './contact-list.component';
import { HttpClientModule } from '@angular/common/http';

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactListComponent ],
      imports: [HttpClientModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Method: filterList() should filter contacts to the specified status', () => {
    component.contacts = [
      {contactStatus: 'red'} as any,
      {contactStatus: 'blue'}
    ];
    component.filterList('blue');
    expect(component.filteredContacts).toEqual([{contactStatus: 'blue'} as any]);
  });

  it('Method: processTimelineData() should format contacts into a format that rux-timeline can understand', () => {
    const contacts = [
  {
    _id: '5c926e56fddac5238823fe38',
    contactId: '9340c394-23b0-54b0-8c92-c2436a165992',
    contactStatus: 'critical',
    contactName: 29076,
    contactGround: 'HTS',
    contactSatellite: 'USA-145',
    contactEquipment: 'ANT53 VAFB1 SFEP225CH1 ECEU6 WS209 USP328',
    contactState: 'executing',
    contactStep: 'Command',
    contactDetail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    contactBeginTimestamp: 1563755880,
    contactEndTimestamp: 1563757140,
    contactLatitude: -87.96765,
    contactLongitude: -161.88142,
    contactAzimuth: -118.573,
    contactElevation: 27.6,
    contactResolution: 'complete',
    contactResolutionStatus: 'normal'
  },
  {
    _id: '5c926e56fddac5238824318c',
    contactId: '7f590746-e1e3-59d3-8449-8deff8830afc',
    contactStatus: 'normal',
    contactName: 17354,
    contactGround: 'NHS',
    contactSatellite: 'USA-154',
    contactEquipment: 'ANT135 BAFB1 SFEP376CH1 ECEU6 WS156 USP411',
    contactState: 'executing',
    contactStep: 'Configure Operation',
    contactDetail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    contactBeginTimestamp: 1563756000,
    contactEndTimestamp: 1563756960,
    contactLatitude: 41.60854,
    contactLongitude: 18.83589,
    contactAzimuth: -109.121,
    contactElevation: 84.4,
    contactResolution: 'complete',
    contactResolutionStatus: 'normal'
  }];
    component.processTimelineData(contacts as any);
    expect(component.timelineData).toEqual([
      {
        label: 'HTS',
        regions: [{
          startTime: component.timelineData[0].regions[0].startTime,
          endTime: component.timelineData[0].regions[0].endTime,
          label: 'ANT53 VAFB1 SFEP225CH1 ECEU6 WS209 USP328',
          status: 'critical',
        }]
      },
      {
        label: 'NHS',
        regions: [{
          startTime: component.timelineData[1].regions[0].startTime,
          endTime: component.timelineData[1].regions[0].endTime,
          label: 'ANT135 BAFB1 SFEP376CH1 ECEU6 WS156 USP411',
          status: 'normal',
        }]
      }
    ]);
  });
});
