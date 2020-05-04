import { Ialert } from './../models/alert';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertsStoreService {

  private readonly _alerts = new BehaviorSubject<Ialert[]>([]);
  readonly alert$ = this._alerts.asObservable();

  get alerts(): Ialert[] {
    return this._alerts.getValue();
  }

  set alerts(val: Ialert[]) {
    this._alerts.next(val);
  }

}
