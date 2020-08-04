import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { Alert } from 'src/app/core/alert.model';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
})
export class AlertsComponent implements OnInit {
  allAlerts: Alert[] = [];
  sortBy = 'none';
  alertsPage: Alert[];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getAlerts().subscribe((alerts: Alert[]) =>
      this.allAlerts = alerts
    );
  }

  onChangePage(page: Alert[]): void {
    this.alertsPage = page;
  }

  onSort(sortBy): void {
    const sortFns = {
      ascending: (a, b) => {
        if (a.errorCategory > b.errorCategory) { return 1; }
        if (b.errorCategory > a.errorCategory) { return -1; }
        return 0;
      },
      descending: (a, b) => {
        if (a.errorCategory > b.errorCategory) { return -1; }
        if (b.errorCategory > a.errorCategory) { return 1; }
        return 0;
      },
      none: (a, b) => {
        if (a.errorTime > b.errorTime) { return -1; }
        if (b.errorTime > a.errorTime) { return 1; }
        return 0;
      }
    };
    this.allAlerts = [...this.allAlerts.sort(sortFns[sortBy])];
  }

  get alertStatus(): {critical: number, serious: number, caution: number} {
    const status = {
      critical: 0,
      serious: 0,
      caution: 0,
    };
    this.allAlerts.map(item =>
      status[item.errorSeverity]++
    );
    return status;
  }

}
