import { Component, signal } from '@angular/core';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
  constructor() {}

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
        case 'contactBeginTimestamp':
          return compare(a.contactBeginTimestamp, b.contactBeginTimestamp, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
