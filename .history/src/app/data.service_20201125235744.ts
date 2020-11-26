import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _alertsUrl from 'alerts.json'


@Injectable({
  providedIn: 'root'
})
export class DataService {
  // private _alertsUrl = '../alerts.json'
  // private _contactsUrl = '../contacts.json'
  constructor(private http: HttpClient) { }

  getAlerts() {
    return this.http.get('https://api.openbrewerydb.org/breweries')
  }

  // getContacts() {
  //   return this.http.get(this._contactsUrl)
  // }
}
