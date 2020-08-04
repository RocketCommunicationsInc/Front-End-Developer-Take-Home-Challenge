import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alerts-row',
  templateUrl: './alerts-row.component.html',
})
export class AlertsRowComponent {
  @Input() alert: any;

  constructor() { }
}
