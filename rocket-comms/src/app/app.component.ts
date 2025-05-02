import { Component } from '@angular/core';
import {DataService} from "./services/data.service";

/**
 * An interface for Contact data.
 */
export interface Contact {
  id: string; // Internal ID.
  contactId: string;
  status: string;
  name: string;
  iron: string; // Contact (Satellite Name).
  groundStation: string;
  state: string;
}

/**
 * An enum of possible states for contacts.
 */
export enum CONTACT_STATE {
  COMPLETE = 'Complete',
  EXECUTING = 'Executing',
  FAILED = 'Failed',
  UPCOMING = 'Upcoming'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  /**
   * Test data used to hydrate the dashboard.
   */
  public data: any = null;

  /**
   * The data structure that holds the Contact table data to be
   * displayed.
   */
  public rows: any = [];

  constructor(private dataService: DataService) {
    // No-op.
  }

  /**
   * Loads the data into the dashboard.
   */
  public loadData(): void {
    if (this.data === null) {

      // NOTE: There is no need to unsubscribe here as our service emits a single value
      // and then completes automatically.
      this.dataService.getData().pipe().subscribe({
        next: (response: any): any => {
          this.data = response;
          this.buildContactRows(response);
        },
        error: (err: any): void => {
          console.error('Error loading data:', err);
          // TODO(gabriel): Show an error to the user explaining no data could
          //  be loaded in the dashboard.
        }
      });
    }
  }

  /**
   * Clears the data from the dashboard.
   */
  public clearData(): void {
    this.data = null;
    this.rows = [];
  }

  /**
   * Builds the Contact row data given the passed-in Contact data.
   * @param data - The Contact data to display in the table.
   */
  public buildContactRows(data: any): void {
    this.rows = []; // Clear the row data.
    for (let i: number = 0; i < data.length; i++) {
      const item: any = data[i];
      const contactRow: Contact = {
        id: item['_id'],
        contactId: item['contactId'],
        status: item['contactStatus'],
        name: item['contactName'],
        iron: item['contactSatellite'],
        groundStation: item['contactGround'],
        state: item['contactState']
      }
      this.rows.push(contactRow);
    }
  }
}
