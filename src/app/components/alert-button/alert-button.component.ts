import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from "@angular/core";
import {BehaviorSubject, Subject} from "rxjs";
import {AlertsService} from "../../service/alerts.service";
import {takeUntil} from "rxjs/operators";

/**
 * Component used to show an icon with an overlay of the current number of alerts.
 * Clicking the icon sends a message to the {@link AlertsService} to set the alerts to visible.
 */
@Component({
  selector: "app-alert-button",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./alert-button.component.html"
})
export class AlertButtonComponent implements OnInit, OnDestroy {
  /**
   * Current count of alerts
   */
  readonly alertCount = new BehaviorSubject<number>(0);

  private readonly onDestroy = new Subject<void>();

  /**
   * ctor
   * @param alertsService
   */
  constructor(private readonly alertsService: AlertsService) {
  }

  ngOnInit(): void {
    this.alertsService.getAlerts().pipe(
      takeUntil(this.onDestroy)
    ).subscribe(alerts => this.alertCount.next(alerts?.length ?? 0));
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  /**
   * When the icon is selected, tell the alerts service to make the alerts visible
   */
  alertButtonSelected(): void {
    this.alertsService.setAlertsVisible(true);
  }

}
