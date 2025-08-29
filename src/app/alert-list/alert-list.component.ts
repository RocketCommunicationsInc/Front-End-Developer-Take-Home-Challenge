import { Component, OnInit } from '@angular/core';
import { AlertService } from '../dashboard/alert.service';
import { Alert } from '../models/alert';

@Component({
  selector: 'app-alert-list',
  standalone: false,
  templateUrl: './alert-list.component.html',
  styleUrl: './alert-list.component.css',
})
export class AlertListComponent implements OnInit {
  alertList: Alert[] = [];
  filteredAlertList: Alert[] = [];
  currentDate: Date = new Date();

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertService.getContacts().subscribe((contacts) => {
      this.alertList = contacts
        .map((contact) => {
          return contact.alerts.map((alert) => ({
            contactName: contact.contactName,
            contactBeginTimestamp: contact.contactBeginTimestamp,
            contactEndTimestamp: contact.contactEndTimestamp,
            contactSatellite: contact.contactSatellite,
            contactDetail: contact.contactDetail,
            errorId: alert.errorId,
            errorSeverity: alert.errorSeverity,
            errorCategory: alert.errorCategory,
            errorMessage: alert.errorMessage,
            longMessage: alert.longMessage,
            errorTime: alert.errorTime,
            selected: alert.selected,
            new: alert.new,
            expanded: alert.expanded,
          }));
        })
        .flat()
        .sort((a, b) => b.errorTime - a.errorTime);
      this.filteredAlertList = this.alertList;
    });
  }
  openDialog(alert: Alert) {
    const dialog = document.getElementById('dialog') as any;
    if (dialog) {
      dialog.header = alert.contactSatellite;
      dialog.message = alert.contactDetail;
      dialog.show();
    }
  }
  closeDialog() {
    const dialog = document.getElementById('dialog') as any;
    if (dialog) {
      dialog.hide();
    }
  }
  acknowledgeAlert(alert: Alert) {
    alert.selected = true;
  }

  applyFilter(event: Event) {
    const target = event.target as HTMLRuxSelectElement;
    const value = target?.value?.toString();
    if (value !== undefined) {
      this.filteredAlertList = this.alertList.filter((alert) =>
        alert.errorSeverity.toLowerCase().includes(value?.toLowerCase())
      );
    }
  }
}
