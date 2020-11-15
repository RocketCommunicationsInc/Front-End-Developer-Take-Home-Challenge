import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Alert} from "../model/alert";
import {take} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AlertsService {
  private alertsVisible = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
  }

  getAlerts(): Observable<Alert[]> {
    // Load data
    return this.http.get<Alert[]>("assets/alerts.json").pipe(
      take(1)
    );
  }

  setAlertsVisible(visible: boolean): void {
    this.alertsVisible.next(visible);
  }

  toggleAlertVisibility(): void {
    this.alertsVisible.next(!this.alertsVisible.getValue());
  }

  getAlertsVisible(): Observable<boolean> {
    return this.alertsVisible.asObservable();
  }
}
