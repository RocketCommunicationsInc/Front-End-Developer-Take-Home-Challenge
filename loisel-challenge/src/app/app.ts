import { Component, signal } from '@angular/core';

import importData from '../../public/data_processed.json';
import { Alert } from './alert/alert-card';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.sass',
})
export class App {
  protected readonly title = signal('loisel-challenge');
  sortedAlerts: Alert[] = importData.slice();
  showContactDetails: boolean = false;
  focusedAlertIndex: number = 0;

  sortAlerts(sort: Sort) {
    const data = importData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedAlerts = data;
      return;
    }

    this.sortedAlerts = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'contactName':
          return compare(a.contactName, b.contactName, isAsc);
        case 'errorTime':
          return compare(a.errorTime, b.errorTime, isAsc);
        case 'errorSeverity':
          return compare(
            severityToNumber(a.errorSeverity),
            severityToNumber(b.errorSeverity),
            isAsc
          );
        default:
          return 0;
      }
    });
  }

  handleShowDetails(index: number) {
    this.focusedAlertIndex = index;
    this.showContactDetails = true;
  }

  handleAck() {
    this.showContactDetails = false;
    this.sortedAlerts[this.focusedAlertIndex].acknowledged = true;
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

function severityToNumber(severity: string): number {
  switch (severity) {
    case 'critical':
      return 0;
    case 'serious':
      return 1;
    case 'caution':
      return 2;
    case 'warning':
      return 3;
  }
  return 100;
}
