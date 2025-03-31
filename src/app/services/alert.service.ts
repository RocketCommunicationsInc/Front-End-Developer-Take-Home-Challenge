import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Alert {
  errorId: string;
  errorSeverity: string;
  errorCategory: string;
  errorMessage: string;
  longMessage: string;
  errorTime: number;
  selected: boolean;
  new: boolean;
  expanded: boolean;
}

export interface Contact {
  contactId: string;
  contactStatus: string;
  contactName: number;
  contactGround: string;
  contactSatellite: string;
  contactEquipment: string;
  contactState: string;
  contactStep: string;
  contactDetail: string;
  contactBeginTimestamp: number;
  contactEndTimestamp: number;
  contactLatitude: number;
  contactLongitude: number;
  contactAzimuth: number;
  contactElevation: number;
  contactResolution: string;
  contactResolutionStatus: string;
  alerts: Alert[];
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private dataUrl = 'assets/data.json';

  constructor(private http: HttpClient) {}

  getAlerts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.dataUrl).pipe(
      map((contacts) => this.processContacts(contacts)),
      catchError((error) => {
        console.error('Error fetching alerts:', error);
        return throwError(() => new Error('Failed to load alerts'));
      })
    );
  }

  private processContacts(contacts: Contact[]): Contact[] {
    return contacts
      .sort((a, b) => this.getLatestAlertTime(b) - this.getLatestAlertTime(a));
  }

  private getLatestAlertTime(contact: Contact): number {
    return contact.alerts.reduce((latest, alert) => Math.max(alert.errorTime, latest), 0);
  }
}
