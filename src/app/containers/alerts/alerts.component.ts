import { SubscribeCleaner } from './../../subscribe-cleaner.component';
import { Alert } from './../../models/alert';
import { Observable } from 'rxjs';
import { AlertsService } from './../../services/alerts.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent extends SubscribeCleaner implements OnInit {

  alerts: Observable<Alert[]>;

  @ViewChild('tbody', {static: true}) tableBody: any;

  displayedColumns: string[] = ['severity', 'message', 'category', 'time'];

  constructor(public alertsService: AlertsService) {
    super();
    this.unsubscribeOnDestroy = this.alertsService.load().subscribe();
  }

  ngOnInit() {
    this.alerts = this.alertsService.alerts;
    this.unsubscribeOnDestroy = this.alerts.subscribe();
  }

  sortit(property) {
    this.tableBody.nativeElement.scrollTop = 0;
    this.alertsService.sort({ direction: !this.alertsService.activeSort || this.alertsService.activeSort.direction === "ASC" ? "DESC" : "ASC", property: property });
  }

  trackById(index: number, alert: Alert) {
    return alert.errorId;
  }

}
