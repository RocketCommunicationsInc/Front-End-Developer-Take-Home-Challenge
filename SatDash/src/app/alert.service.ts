import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Alert } from '../alert';
import { ALERTS } from '../assets/alerts.json';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  getAlerts(): Observable<Alert[]> {
    return of(ALERTS);
  }
  constructor() {}
}
