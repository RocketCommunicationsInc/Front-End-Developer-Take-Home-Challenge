import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';
import { Alert } from '../models/alert';

@Injectable({
    providedIn: 'root'
})
/*
Data source service which pulls in data from API
*/
export class DataSourceService {
    contactsUrl = './assets/contacts.json';
    alertsUrl = './assets/alerts.json';

    constructor(private http: HttpClient) {}

    // returns JSON of contacts.json => models/contact model
    getContacts(): Observable<Contact[]> {
        return this.http.get<Contact[]>(this.contactsUrl);
    }

    // returns JSON of alerts.json in models/alert model
    getAlerts(): Observable<Alert[]> {
        return this.http.get<Alert[]>(this.alertsUrl);
    }
}
