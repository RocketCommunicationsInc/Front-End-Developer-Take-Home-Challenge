import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert-detail',
  standalone: false,
  templateUrl: './alert-detail.component.html',
  styleUrls: ['./alert-detail.component.scss'],
})
export class AlertDetailComponent {
  /** Input property to receive contact details */
  @Input() contact: any;

  /** Input property to determine the alert type */
  @Input() type: string = '';

  /** Event emitted when the dialog is closed */
  @Output() close = new EventEmitter<void>();

  /** Event emitted when the alert is acknowledged */
  @Output() acknowledge = new EventEmitter<void>();

  /**
   * Handles acknowledgment action.
   * Emits both 'acknowledge' and 'close' events.
   */
  onAcknowledge() {
    this.acknowledge.emit();
    this.close.emit();
  }

  /**
   * Handles close action.
   * Emits the 'close' event.
   */
  onClose() {
    this.close.emit();
  }
}
