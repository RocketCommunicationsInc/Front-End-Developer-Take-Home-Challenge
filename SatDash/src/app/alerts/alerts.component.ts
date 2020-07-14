import { Component, OnInit } from '@angular/core';

import { Alert } from '../../alert';
import { AlertService } from '../alert.service';
import { DebuggerService } from '../debugger.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
})
export class AlertComponent implements OnInit {
  selectedAlert: Alert;

  alerts: Alert[];

  alertCount: number;

  constructor(
    private alertService: AlertService,
    private debuggerService: DebuggerService
  ) {}

  ngOnInit(): void {
    this.getAlerts();
  }

  onSelect(alert: Alert): void {
    this.selectedAlert = alert;
    this.debuggerService.add(`Alerts: Selected alert id=${alert.errorId}`);
  }

  getAlerts(): void {
    this.alertService.getAlerts().subscribe((alerts) => {
      this.alerts = alerts;
      this.alertCount = this.alerts.length;
    });
  }
}
