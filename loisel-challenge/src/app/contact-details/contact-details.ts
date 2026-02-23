import { Component, input, output } from '@angular/core';
import { Alert } from '../alert/alert-card';

@Component({
  selector: 'app-contact-details',
  standalone: false,
  templateUrl: './contact-details.html',
  styleUrl: './contact-details.sass',
})
export class ContactDetails {
  open = input.required<boolean>();
  alert = input.required<Alert>();

  acknowledgeAlert = output<void>();

  handleAcknowledge() {
    this.acknowledgeAlert.emit();
  }
}
