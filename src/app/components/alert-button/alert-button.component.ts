import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from "@angular/core";
import {BehaviorSubject, Subject} from "rxjs";
import {AlertsService} from "../../service/alerts.service";
import {takeUntil} from "rxjs/operators";
import {EventService} from "../../service/event.service";

/**
 * Component used to show an icon with an overlay of the current number of alerts.
 * Clicking the icon sends a message to the {@link EventService} to set the slideout containing the alerts to visible.
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
   * @param eventService
   */
  constructor(private readonly alertsService: AlertsService,
              private readonly eventService: EventService) {
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
   * When the icon is selected, tell the event service to make the slideout visible
   */
  alertButtonSelected(): void {
    this.eventService.sendEvent({
      type: "slideout",
      data: true
    });
  }

}
