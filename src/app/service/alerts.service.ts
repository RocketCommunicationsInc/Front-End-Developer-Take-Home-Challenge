import {Inject, Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Alert} from "../model/alert";
import {DataPathsService, DataPathsToken} from "../modules/data-load/model/data-paths.service";
import {DataService, DataServiceToken} from "../modules/data-load/model/data.service";

/**
 * Service that wraps retrieval of alerts and also manages the visibility state of the alerts list.
 *
 * It's not the greatest idea to be putting UI state in a service, but it allowed me to keep the header agnostic and
 * not have to pass an @Output event from the AlertButtonComponent to the Header, to the AppComponent, to ...
 */
@Injectable({
  providedIn: "root"
})
export class AlertsService {
  private readonly alertsVisible = new BehaviorSubject<boolean>(false);

  /**
   * ctor
   * @param dataPaths
   * @param dataService
   */
  constructor(@Inject(DataPathsToken) private readonly dataPaths: DataPathsService,
              @Inject(DataServiceToken) private readonly dataService: DataService) {
  }

  /**
   * Get the list of alerts. This is designed to be a hot observable that updates as the list of alerts changes, but
   * the actual behavior is determined by the implementation of {@link DataService} that's injected
   */
  getAlerts(): Observable<Alert[]> {
    return this.dataService.getData<Alert>(this.dataPaths.getAlertsPath());
  }

  /**
   * Set the visibility state of the alerts list in the UI
   * @param visible
   */
  setAlertsVisible(visible: boolean): void {
    this.alertsVisible.next(visible);
  }

  /**
   * Get the visibility state of the alerts list in the UI
   */
  getAlertsVisible(): Observable<boolean> {
    return this.alertsVisible.asObservable();
  }
}
