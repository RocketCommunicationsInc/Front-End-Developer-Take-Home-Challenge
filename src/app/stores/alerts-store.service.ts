import { Alert } from './../models/alert';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertsStoreService {

  private readonly _alerts = new BehaviorSubject<Alert[]>([]);
  readonly alert$ = this._alerts.asObservable();

  get alerts(): Alert[] {
    return this._alerts.getValue();
  }

  set alerts(val: Alert[]) {
    this._alerts.next(val);
  }

}
