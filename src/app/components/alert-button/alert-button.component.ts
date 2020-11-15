import {Component, OnDestroy, OnInit} from "@angular/core";
import {BehaviorSubject, Subject} from "rxjs";
import {AlertsService} from "../../service/alerts.service";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: "app-alert-button",
  templateUrl: "./alert-button.component.html",
  styleUrls: ["./alert-button.component.scss"]
})
export class AlertButtonComponent implements OnInit, OnDestroy {
  readonly alertCount = new BehaviorSubject<number>(0);

  private readonly onDestroy = new Subject<void>();

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

  alertButtonSelected(): void {
    this.alertsService.setAlertsVisible(true);
  }

}
