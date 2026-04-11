

// OnInit and OnDestroy are interfaces that require us to implement specific methods that Angular calls at specific moments

import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AlertService } from '../../services/alert.service';
import { Alert } from '../../models/contact.model';

@Component({
  selector: 'app-alert-table',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './alert-table.component.html',
  styleUrls: ['./alert-table.component.scss']
})
export class AlertTableComponent implements OnInit, OnDestroy {

  alerts: Alert[] = []; // Full unfiltered alerts list from the service
  filteredAlerts: Alert[] = []; // Alerts that are display after filtering
  selectedSeverity = 'all'; // Tracking when filter alert is active
  dialogOpen = false; // Controlling whether the detail dialog is visible 
  selectedAlert: Alert | null = null; // Which alert's details to show in the dialog

  severityOptions = [
    { label: 'All Severities', value: 'all' },
    { label: 'Critical',       value: 'critical' },
    { label: 'Serious',        value: 'serious' },
    { label: 'Caution',        value: 'caution' },
    { label: 'Normal',         value: 'normal' }
  ];

  private subscription?: Subscription;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void { // This is where we load the data. We did not load the data from the constructor because it runs before Angular fully sets up the component.
    this.subscription = this.alertService.alerts$.subscribe(alerts => {
      this.alerts = alerts;
      this.applyFilter();
    });
  }

  ngOnDestroy(): void { // Disconnecting from the observable to prevent memory leak
    this.subscription?.unsubscribe(); // ? this means that we only call unsubscribe only if subscription exists
  }

  applyFilter(): void { // Spreading the full alerts array into a new array
    this.filteredAlerts = this.selectedSeverity === 'all'
      ? [...this.alerts]
      : this.alerts.filter(a => a.errorSeverity === this.selectedSeverity); // Keeping only alerts that matches the selected severity
  }

  onSeverityChange(event: Event): void { // Fires when the user picks different severity from the dropdown options
    const select = event.target as HTMLSelectElement;
    this.selectedSeverity = select.value;
    this.applyFilter();
  }

  acknowledge(alert: Alert): void { // only calls the service if the alert is not fully acknowledged
    if (!alert.acknowledged) {
      this.alertService.acknowledgeAlert(alert.errorId);
    }
  }

  showDetails(alert: Alert): void { // Stores which alerts was clicked and opens the dialog
    this.selectedAlert = alert;
    this.dialogOpen = true;
  }

  onDialogClosed(): void { // clears everything when the dialog closes
    this.dialogOpen = false;
    this.selectedAlert = null; // This is to prevents stale data showing if the dialog reopens
  }


  // Can also use date-fns or DatePipe.
  formatTimestamp(ts: number): string {
    return new Date(ts).toLocaleString('en-US', {
      month:  'short',
      day:    '2-digit',
      hour:   '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  }

  formatTimeRange(begin: number, end: number): string {
    const b = new Date(begin).toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit', hour12: false
    });
    const e = new Date(end).toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit', hour12: false
    });
    return `${b} – ${e}`;
  }

  get unacknowledgedCount(): number { // Counts unacknowledged alerts per severity for the summary cards  
    return this.filteredAlerts.filter(a => !a.acknowledged).length;
  }

  get criticalCount(): number { 
    return this.alerts.filter(a => a.errorSeverity === 'critical' && !a.acknowledged).length;
  }

  get seriousCount(): number {
    return this.alerts.filter(a => a.errorSeverity === 'serious' && !a.acknowledged).length;
  }

  get cautionCount(): number {
    return this.alerts.filter(a => a.errorSeverity === 'caution' && !a.acknowledged).length;
  }


  // trackBy tells Angular how to identify each item in a list
  trackByErrorId(_: number, alert: Alert): string { // Helps Angular to track which items changed. _ a convention meaning "I receive this parameter but don't use it"
    return alert.errorId;
  }
}