import {Inject, Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Alert} from "../model/alert";
import {DataPathsService, DataPathsToken} from "../modules/data-load/model/data-paths.service";
import {DataService, DataServiceToken} from "../modules/data-load/model/data.service";

@Injectable({
  providedIn: "root"
})
export class AlertsService {
  private alertsVisible = new BehaviorSubject<boolean>(false);

  constructor(@Inject(DataPathsToken) private readonly dataPaths: DataPathsService,
              @Inject(DataServiceToken) private readonly dataService: DataService) {
  }

  getAlerts(): Observable<Alert[]> {
    return this.dataService.getData<Alert>(this.dataPaths.getAlertsPath());
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
