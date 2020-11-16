import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from "@angular/core";
import {Alert} from "../../model/alert";
import {takeUntil} from "rxjs/operators";
import {ColDef, FirstDataRenderedEvent} from "ag-grid-community";
import {AlertsService} from "../../service/alerts.service";
import {Subject} from "rxjs";

/**
 * Component that shows the current alerts in a table view
 */
@Component({
  selector: "app-alerts",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./alerts.component.html",
  styleUrls: ["./alerts.component.scss"]
})
export class AlertsComponent implements OnInit, OnDestroy {
  /**
   * Column definitions for the table
   */
  readonly columnDefs: ColDef[] = [
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
      sort: "asc",
      resizable: true
    },
    {
      field: "errorTime",
      headerName: "Time",
      resizable: true
    },
  ];

  /**
   * Current set of alerts to be shown in the table
   */
  alerts: Alert[];
  /**
   * Current count of alerts
   */
  alertsCount = 0;

  private readonly onDestroy = new Subject<void>();

  /**
   * ctor
   * @param alertsService
   * @param changeDetectorRef
   */
  constructor(private readonly alertsService: AlertsService,
              private readonly changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    // Load data
    this.alertsService.getAlerts().pipe(
      takeUntil(this.onDestroy)
    ).subscribe(alerts => {
      setTimeout(() => {
        this.alerts = alerts;
        this.alertsCount = alerts.length;
        this.changeDetectorRef.markForCheck();
      });
    });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  /**
   * ag-grid lifecycle. Called when data is first loaded into the grid to autosize all of the columns for the display
   * width.
   * @param event
   */
  onFirstDataRendered(event: FirstDataRenderedEvent): void {
    const columnIds = event.columnApi.getAllColumns().map(column => column.getColId());
    event.columnApi.autoSizeColumns(columnIds);
  }

}
