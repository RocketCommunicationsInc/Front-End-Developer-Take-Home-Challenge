import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactListComponent } from './contact-list.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AstroComponentsModule} from "@astrouxds/angular";
import {DataService} from "../../services/data.service";
import {
  ContactWithAlertStatus
} from "../../models/contact-with-alert-status.model";
import {Alert} from "../../models/alert.model";
import {BlockUIModule} from "ng-block-ui";

describe('ContactListComponent', () => {

  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        AstroComponentsModule,
        BlockUIModule.forRoot()
      ],
      providers: [
        DataService
      ],
      declarations: [ContactListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('sortAlertsByErrorTime', () => {

    it('#1: should handle contacts with only one alert', () => {
      const contacts: Array<ContactWithAlertStatus> = [
        {
          contactName: 1234,
          alerts: [
            {
              errorTime: 2000
            } as Alert
          ]
        } as ContactWithAlertStatus
      ];

      const sortedContacts = component.sortAlertsByErrorTime(true, contacts);

      // Verify the single alert is still handled correctly.
      expect(sortedContacts[0].contactName).toBe(1234);
      expect(sortedContacts[0].alerts.length).toBe(1);
      expect(sortedContacts[0].alerts[0].errorTime).toBe(2000);
    });

    it('#2: should leave alerts in ascending order (oldest first)', () => {
      const contacts: Array<ContactWithAlertStatus> = [
        {
          contactName: 2112,
          alerts: [
            {
              errorTime: 1000 // Older error time.
            } as Alert,
            {
              errorTime: 1500 // Newer error time.
            } as Alert
          ]
        } as ContactWithAlertStatus
      ];

      const sortedContacts = component.sortAlertsByErrorTime(false, contacts);

      // Verify alerts are sorted in ascending order (oldest first).
      expect(sortedContacts[0].contactName).toBe(2112);
      expect(sortedContacts[0].alerts.length).toBe(2);
      expect(sortedContacts[0].alerts[0].errorTime).toBe(1000);
      expect(sortedContacts[0].alerts[1].errorTime).toBe(1500);
    });

    it('#3: should sort alerts in ascending order (oldest first)', () => {
      const contacts: Array<ContactWithAlertStatus> = [
        {
          contactName: 1812,
          alerts: [
            {
              errorTime: 2500 // Newer error time.
            } as Alert,
            {
              errorTime: 500 // Older error time.
            } as Alert
          ]
        } as ContactWithAlertStatus
      ];

      const sortedContacts = component.sortAlertsByErrorTime(false, contacts);

      // Verify alerts are sorted in ascending order (oldest first).
      expect(sortedContacts[0].contactName).toBe(1812);
      expect(sortedContacts[0].alerts.length).toBe(2);
      expect(sortedContacts[0].alerts[0].errorTime).toBe(500);
      expect(sortedContacts[0].alerts[1].errorTime).toBe(2500);
    });

    it('#4: should sort alerts in descending order (most recent first)', () => {
      const contacts: Array<ContactWithAlertStatus> = [
        {
          contactName: 2025,
          alerts: [
            {
              errorTime: 1000 // Older error time.
            } as Alert,
            {
              errorTime: 1500 // Newer error time.
            } as Alert,
          ]
        } as ContactWithAlertStatus
      ];

      const sortedContacts = component.sortAlertsByErrorTime(true, contacts);

      // Verify alerts are sorted in descending order (most recent first)
      expect(sortedContacts[0].contactName).toBe(2025);
      expect(sortedContacts[0].alerts.length).toBe(2);
      expect(sortedContacts[0].alerts[0].errorTime).toBe(1500);
      expect(sortedContacts[0].alerts[1].errorTime).toBe(1000);
    });

    it('should handle contacts with no alerts', () => {
      const contacts: Array<ContactWithAlertStatus> = [
        {
          contactName: 1776,
          alerts: []
        } as unknown as ContactWithAlertStatus
      ];

      const sortedContacts = component.sortAlertsByErrorTime(true, contacts);

      // Ensure no changes happen.
      expect(sortedContacts[0].contactName).toBe(1776);
      expect(sortedContacts[0].alerts.length).toBe(0);
      expect(sortedContacts[0].alerts).toEqual([]);
    });

    it('should handle contacts with invalid or degenerate errorTimes', () => {
      const contacts: Array<ContactWithAlertStatus> = [
        {
          contactName: 10,
          alerts: [
            {
              errorTime: null // Invalid errorTime.
            } as unknown as Alert,
            {
              errorTime: 100 // Valid errorTime.
            } as unknown as Alert
          ]
        } as ContactWithAlertStatus,
        {
          contactName: 20,
          alerts: [
            {
              errorTime: 200 // Valid errorTime.
            } as unknown as Alert,
            {
              errorTime: undefined // Invalid errorTime.
            } as unknown as Alert,
            {
              errorTime: 100 // Valid errorTime.
            } as unknown as Alert
          ]
        } as ContactWithAlertStatus
      ];

      const sortedContacts = component.sortAlertsByErrorTime(false, contacts);

      // Verify that invalid errorTimes are placed after valid ones.
      expect(sortedContacts[0].contactName).toBe(10);
      expect(sortedContacts[0].alerts.length).toBe(2);
      expect(sortedContacts[0].alerts[0].errorTime).toBe(100);
      expect(sortedContacts[0].alerts[1].errorTime).toBeNull();

      expect(sortedContacts[1].contactName).toBe(20);
      expect(sortedContacts[1].alerts.length).toBe(3);
      expect(sortedContacts[1].alerts[0].errorTime).toBe(100);
      expect(sortedContacts[1].alerts[1].errorTime).toBe(200);
      expect(sortedContacts[1].alerts[2].errorTime).toBeUndefined();
    });

    it('should preserve the order of contacts when alerts are not sorted', () => {
      const contacts: Array<ContactWithAlertStatus> = [
        {
          contactName: 10,
          alerts: [
            {
              errorTime: 1200
            } as Alert
          ]
        } as ContactWithAlertStatus,
        {
          contactName: 20,
          alerts: [
            {
              errorTime: 1500
            } as Alert
          ]
        } as ContactWithAlertStatus
      ];

      const sortedContacts = component.sortAlertsByErrorTime(true, contacts);

      // Ensure the contacts themselves are in the same order
      expect(sortedContacts[0].contactName).toBe(10);
      expect(sortedContacts[0].alerts.length).toBe(1);

      expect(sortedContacts[1].contactName).toBe(20);
      expect(sortedContacts[1].alerts.length).toBe(1);
    });

    it('should preserve the order of contacts when alerts are sorted', () => {
      const contacts: Array<ContactWithAlertStatus> = [
        {
          contactName: 10,
          alerts: [
            {
              errorTime: 1200
            } as Alert,
            {
              errorTime: 1700
            } as Alert
          ]
        } as ContactWithAlertStatus,
        {
          contactName: 20,
          alerts: [
            {
              errorTime: 2000
            } as Alert,
            {
              errorTime: 1500
            } as Alert
          ]
        } as ContactWithAlertStatus
      ];

      const sortedContacts = component.sortAlertsByErrorTime(true, contacts);

      // Ensure the contacts themselves are in the same order
      expect(sortedContacts[0].contactName).toBe(10);
      expect(sortedContacts[0].alerts.length).toBe(2);
      expect(sortedContacts[0].alerts[0].errorTime).toBe(1700);
      expect(sortedContacts[0].alerts[1].errorTime).toBe(1200);

      expect(sortedContacts[1].contactName).toBe(20);
      expect(sortedContacts[1].alerts.length).toBe(2);
      expect(sortedContacts[1].alerts[0].errorTime).toBe(2000);
      expect(sortedContacts[1].alerts[1].errorTime).toBe(1500);
    });
  });
});
