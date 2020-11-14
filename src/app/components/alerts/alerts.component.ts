import {Component, OnDestroy, OnInit} from "@angular/core";
import {Alert} from "../../model/alert";
import {takeUntil} from "rxjs/operators";
import {ColDef, FirstDataRenderedEvent} from "ag-grid-community";
import {AlertsService} from "../../service/alerts.service";
import {Subject} from "rxjs";

@Component({
  selector: "app-alerts",
  templateUrl: "./alerts.component.html",
  styleUrls: ["./alerts.component.scss"]
})
export class AlertsComponent implements OnInit, OnDestroy {
  columnDefs: ColDef[] = [
    {
      field: "errorMessage",
      headerName: "Message",
      flex: 2,
      resizable: true
    },
    {
      field: "errorCategory",
      headerName: "Category",
      sortable: true,
      resizable: true
    },
    {
      field: "errorTime",
      headerName: "Time",
      resizable: true
    },
  ];

  alerts: Alert[];
  alertsCount = 0;

  private readonly onDestroy = new Subject<void>();

  constructor(private alertsService: AlertsService) {
  }

  ngOnInit(): void {
    // Load data
    this.alertsService.getAlerts().pipe(
      takeUntil(this.onDestroy)
    ).subscribe(alerts => {
      this.alerts = alerts;
      this.alertsCount = alerts.length;
    });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  closeAlerts(): void {
    this.alertsService.setAlertsVisible(false);
  }

  onFirstDataRendered(event: FirstDataRenderedEvent): void {
    const columnIds = event.columnApi.getAllColumns().map(column => column.getColId());
    event.columnApi.autoSizeColumns(columnIds);
  }

}
