import { Component, OnInit } from '@angular/core';
import { Alert } from '../alert.model';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-alerts-table',
  templateUrl: './alerts-table.component.html',
  styleUrls: ['./alerts-table.component.scss']
})
export class AlertsTableComponent implements OnInit {
  sortDir = 'asc';
  alerts: Alert[] = [];

  constructor(
    private _alertService: AlertService
  ) { }

  ngOnInit(): void {
    this._alertService.fetchAll().subscribe((res: Alert[]) => this.alerts = res);
  }

  onChangeSortDir(): void{
    this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
  }

}
