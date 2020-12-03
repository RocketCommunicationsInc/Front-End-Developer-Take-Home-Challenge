import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ConfigService } from '../shared/config.service'
import { Observable, Subject, throwError } from 'rxjs'
import { map, catchError } from 'rxjs/operators'

interface AlertsData {
  errorId: string;
  errorSeverity: string;
  errorCategory: string;
  errorMessage: string;
  longMessage: string;
  errorTime: number;
  selected: boolean;
  new: boolean;
  expanded: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  path: string = this.config.alertsAPI
  public onError = new Subject<string>()

  constructor(
    private config: ConfigService,
    private http: HttpClient,
  ) { }

  public getData(path = this.path) : Observable<AlertsData[]> {
    return this.http.get<AlertsData[]>(path)
    .pipe(
      map((response: AlertsData[]) => response),
      catchError(error => {
        this.onError.next(error.message)
        return throwError(error)
      })
    )
  }

}
