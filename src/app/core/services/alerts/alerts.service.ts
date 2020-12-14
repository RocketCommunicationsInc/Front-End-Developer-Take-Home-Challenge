import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
    constructor(private http: HttpClient) {
    }

    getAlerts() {
        return this.http.get<any>('assets/json/alerts.json');
    }
}
