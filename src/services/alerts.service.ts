import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private httpClient: HttpClient) {}

  getAlerts() {
    return this.httpClient.get("assets/json/alerts.json");
  }
}
