import { Isorter } from './../models/sorter';
import { Ialert, IalertSummary } from './../models/alert';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError, Observable, BehaviorSubject, of } from 'rxjs';
import { map, catchError, tap, distinctUntilChanged, switchMap, filter, shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  private _alerts: Ialert[];
  alerts: Observable<Ialert[]>;
  activeSort: Isorter;
  private alertsSubject = new BehaviorSubject<Ialert[]>([])

  constructor(
    private http: HttpClient) {

    this.alerts = this.alertsSubject.asObservable().pipe(
      filter(res => res !== null),
      distinctUntilChanged(),
      map(res => {
        return res;
      })
    );

  }

  load(): Observable<Ialert[]> {
    return this.http.get<Ialert[]>('https://raw.githubusercontent.com/santhony7/Angular-Developer-Take-Home-Challenge/master/alerts.json')
      .pipe(
        shareReplay(1),
        tap(res => {
          return this.alertsSubject.next(res.sort((a, b) => {
            this._alerts = res;
            if (!this.activeSort) {
              return 1;
            } else if (this.activeSort.direction === 'ASC') {
              return (a[this.activeSort.property] > b[this.activeSort.property]) ? 1 : -1;
            } else if (this.activeSort.direction === 'DESC')
              return (a[this.activeSort.property] > b[this.activeSort.property]) ? -1 : 1;
          }
          ))
        }
        ),
        catchError(errors => {
          return observableThrowError(errors);
        })
      );
  }

  getSummary(): Observable<IalertSummary> {
    return this.alerts
      .pipe(
        switchMap(res => {
          const keys = [...new Set(res.map(i => i.errorSeverity))];
          const counts = new Map(keys.map(k => [k, res.filter(i => i.errorSeverity === k).length]));
          const obj = {};
          for (let prop of counts) {
            obj[prop[0]] = prop[1];
          }
          return of({ total: res.length, severities: obj } as IalertSummary);
        }),
        catchError(errors => {
          return observableThrowError(errors);
        })
      );
  }

  sort(sorter: Isorter): void {
    this.activeSort = sorter;
    return this.alertsSubject.next(this._alerts.sort((a, b) => {
      if (!this.activeSort) {
        return 1;
      } else if (this.activeSort.direction === 'ASC') {
        return (a[this.activeSort.property] > b[this.activeSort.property]) ? 1 : -1;
      } else if (this.activeSort.direction === 'DESC')
        return (a[this.activeSort.property] > b[this.activeSort.property]) ? -1 : 1;
    }
    ))
  }

}

//[k, res.filter(i => i.errorSeverity === k).length]
