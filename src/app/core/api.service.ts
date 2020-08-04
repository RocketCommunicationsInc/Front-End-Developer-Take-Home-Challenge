import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Alert } from './alert.model';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'any'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getAlerts(): Observable<Alert[]> {
    return this.http.get('assets/alerts.json').pipe(
      map((alerts: any[]) =>
        alerts.map(item => ({
          ...item,
          icon: getIcon(item.errorCategory),
        }))
      )
    );
  }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>('assets/contacts.json');
  }
}

function getIcon(category): string {
  switch (category) {
    case 'software': return 'processor';
    case 'hardware': return 'equipment';
    case 'spacecraft': return 'satellite-off';
  }
}
