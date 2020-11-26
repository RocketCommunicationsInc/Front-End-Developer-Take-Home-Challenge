import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import * as _alertsUrl from 'alerts.json'


@Injectable({
  providedIn: 'root'
})
export class DataService {
 
  // private _contactsUrl = '../contacts.json'
  constructor(private http: HttpClient) { }
  private _alertsUrl = '../alerts.json'
  getAlerts() {
    return this.http.get(this._alertsUrl)
  }

  // getContacts() {
  //   return this.http.get(this._contactsUrl)
  // }
}
