import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  // private _alertsUrl = '../alerts.json'
  // private _contactsUrl = '../contacts.json'
  constructor(private http: HttpClient) { }

  getAlerts() {
    return this.http.get(this._alertsUrl)
  }

  getContacts() {
    return this.http.get(this._contactsUrl)
  }
}
