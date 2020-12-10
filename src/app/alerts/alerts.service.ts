import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

/**
 * The alerts services
 */
@Injectable()
export class AlertsService {
  constructor(
    private http: HttpClient
  ) { }

  /**
   * Loads the alerts from the json data file
   */
  loadAlerts(): Observable<any> {
    return this.http.get('assets/alerts.json')
  }
}
