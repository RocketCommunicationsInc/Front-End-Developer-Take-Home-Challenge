// alert-list.component.ts
import { Component, OnInit } from '@angular/core';
import { AlertService, Contact } from '../../services/alert.service';

interface ExtendedContact extends Contact {
  acknowledged?: boolean;
}

@Component({
  selector: 'app-alert-list',
  standalone: false,
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.scss'],
})
export class AlertListComponent implements OnInit {
  contacts: ExtendedContact[] = [];
  filteredContacts: ExtendedContact[] = [];
  selectedContact: ExtendedContact | null = null;
  alertType: string = ''; // Type for the alert detail component

  // Alert statistics
  unacknowledgedCount = 0;
  criticalCount = 0;
  seriousCount = 0;
  cautionCount = 0;
  warningCount = 0;

  searchQuery: string = '';

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    // Fetch alerts from the service
    this.alertService.getAlerts().subscribe((data) => {
      this.contacts = data;
      this.filteredContacts = data;
      this.calculateStatistics();
    });
  }

  /**
   * Displays alert details in the alert detail component.
   * @param contact Selected contact object
   * @param type Type of alert (acknowledge/details)
   */
  showDetails(contact: ExtendedContact, type: string): void {
    this.selectedContact = contact;
    this.alertType = type;
  }

  /**
   * Marks an alert as acknowledged.
   * @param contact Contact object to be acknowledged
   */
  acknowledgeAlert(contact: ExtendedContact): void {
    contact.acknowledged = true;
    this.calculateStatistics();
  }

  /**
   * Calculates statistics for different alert types.
   */
  private calculateStatistics(): void {
    // Reset counts
    this.unacknowledgedCount = 0;
    this.criticalCount = 0;
    this.seriousCount = 0;
    this.cautionCount = 0;
    this.warningCount = 0;

    // Iterate through contacts to update counts
    this.filteredContacts.forEach((contact) => {
      if (!contact.acknowledged) {
        this.unacknowledgedCount += contact.alerts.length;
      }
      contact.alerts.forEach((alert) => {
        switch (alert.errorSeverity) {
          case 'critical':
            this.criticalCount++;
            break;
          case 'serious':
            this.seriousCount++;
            break;
          case 'caution':
            this.cautionCount++;
            break;
          case 'warning':
            this.warningCount++;
            break;
        }
      });
    });
  }

  /**
   * Filters alerts based on the search input.
   * @param event Input event from the search bar
   */
  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchQuery = inputElement.value.toLowerCase();

    this.filteredContacts = this.contacts.filter((contact) =>
      contact.contactName.toString().toLowerCase().includes(this.searchQuery) ||
      JSON.stringify(contact.alerts.map(alert => alert.errorMessage)).toLowerCase().includes(this.searchQuery)
    );

    this.calculateStatistics();
  }
}
