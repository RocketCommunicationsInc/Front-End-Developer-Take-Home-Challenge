import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AlertsService } from '../../../services/alerts.service';
import { Alert } from '../../../models/alert';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TimeUtilsService } from 'src/services/time-utils.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  displayedColumns: string[] = ['category', 'message', 'time'];

  alertsCount: number;
  cautionCount: number;
  criticalCount: number;
  seriousCount: number; 

  alertsDataSource: MatTableDataSource<Alert>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private alertsServices: AlertsService, private timeUtilsService: TimeUtilsService) { }

  ngOnInit(): void {
    this.alertsServices.getAlerts().subscribe( data => {
      const parsedData = this.parse(data);

      this.cautionCount = parsedData.filter((d) => d.severity === "caution").length;
      this.criticalCount = parsedData.filter((d) => d.severity === "critical").length;
      this.seriousCount = parsedData.filter((d) => d.severity === "serious").length;

      this.alertsDataSource = new MatTableDataSource(parsedData);
      this.alertsDataSource.sort = this.sort;
      this.alertsDataSource.paginator = this.paginator;

      this.alertsCount = this.alertsDataSource.data.length;
    });

  }

  parse(data: any) : Alert[] {
    const alerts: Alert[] = [];
      data.forEach(d => {

        let alert: Alert = {
          id: d.errorId,
          category: d.errorCategory,
          message: d.errorMessage,
          time: this.timeUtilsService.getUTCTimeDisplayFormat(d.errorTime),
          severity: d.errorSeverity
        }

        alerts.push(alert);
      });

    return alerts;
  }
}
