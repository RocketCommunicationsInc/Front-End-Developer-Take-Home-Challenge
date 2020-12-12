import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import '@astrouxds/rux-classification-marking';
import { AlertService } from 'src/app/services/alert/alert.service';
@Component({
  selector: 'app-alert-list',
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertListComponent implements OnInit {

  @ViewChild('errorTimeTemplate', {static: true}) errorTimeTemplate;
  @ViewChild('errorSeverityTemplate', {static: true}) errorSeverityTemplate;
  alerts: Alert[] = [];
  showError = false;
  loading = true;

  constructor(private service: AlertService, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.service.getResults().subscribe({
      next: this.onSuccess.bind(this),
      error: this.onFailure.bind(this),
    });
  }

  get columnConfig(): any[] {
    const columns = [
      {
        name: 'errorSeverity',
        cellTemplate: this.errorSeverityTemplate,
        label: ''
      },
      {
        name: 'errorCategory',
        label: 'Category'
      },
      {
        name: 'errorMessage',
        label: 'Error'
      },
      {
        name: 'errorTime',
        cellTemplate: this.errorTimeTemplate,
        label: 'Time'
      },
    ];
    return columns;
  }

  private onSuccess(res: Alert[]): void {
    res.forEach((alert: Alert) => {
      alert.details = alert.longMessage;
    });
    this.alerts = res;
    this.loading = false;
    this.ref.markForCheck();
  }

  private onFailure(): void {
    this.showError = true;
  }
}
