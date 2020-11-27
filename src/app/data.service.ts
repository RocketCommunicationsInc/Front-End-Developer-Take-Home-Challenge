import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {
 
  constructor(private http: HttpClient) { }

  private _alertsUrl = '../alerts.json'
  private _contactsUrl = '../contacts.json'

  getAlerts() {
    return this.http.get<any[]>(this._alertsUrl)
  }

  getContacts() {
    return this.http.get<any[]>(this._contactsUrl)
  }
}
