import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const FILE_PATH = 'assets/alerts.json'

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private http: HttpClient) {}

  public getResults(): Observable<any> {
    return this.http.get(FILE_PATH);
  }
}
