import { Component, OnInit } from '@angular/core';
import { Alert } from '../../alert';
import { AlertService } from '../alert.service';
import { DebuggerService } from '../debugger.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  alerts: Alert[];

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.getAlerts();
  }

  getAlerts(): void {
    this.alertService.getAlerts().subscribe((alerts) => (this.alerts = alerts));
  }
}
