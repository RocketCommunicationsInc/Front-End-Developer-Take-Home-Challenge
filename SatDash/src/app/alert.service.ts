import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Alert } from '../alert';
import { ALERTS } from './mock-alerts';
import { DebuggerService } from './debugger.service';

// much like with contacts, we can't have a synchronous assignment because our app will break the moment it can't get the data on the first try. rather we need to subscribe to an observable to emit the array of alerts, making it async
@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private debuggerService: DebuggerService) {}

  getAlerts(): Observable<Alert[]> {
    this.debuggerService.add('Alert Service: fetched all alerts');
    return of(ALERTS);
  }

  // This is typical service-in-service scenario where I inject the debuggerService into the Alert service, which is injected into the Alerts component
}
