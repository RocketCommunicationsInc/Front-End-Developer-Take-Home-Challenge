import { Component } from '@angular/core';
import {DataService} from "../../services/data.service";
import {Contact} from "../../models/contact.model";
import {CONTACT_STATE} from "../../models/contact-state.enum";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent {

  /**
   * The raw data used to hydrate the dashboard.
   */
  public rawData: any = null;

  /**
   * The data structure that holds the Contact table row data.
   */
  public rows: any[] = [];

  /**
   * The name of the column currently being sorted.
   */
  public sortColumn: string = '';

  /**
   * The current sort direction.  Can be 'asc' for ascending or 'desc'
   * for descending.
   */
  public sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private dataService: DataService) {
    // No-op.
  }

  /**
   * Loads the data into the dashboard.
   */
  public loadData(): void {
    if (this.rawData === null) {

      // NOTE: There is no need to unsubscribe here as our service emits a
      // single value and then completes automatically.
      this.dataService.getData().pipe().subscribe({
        next: (response: any): any => {
          this.rawData = response;
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
    this.rawData = null;
    this.rows = [];
    this.sortColumn = '';
  }

  /**
   * Builds the Contact row data given the passed-in Contact data.
   * @param data - The Contact data to display in the table.
   */
  public buildContactRows(data: any): void {
    this.rows = []; // Clear the row data.
    for (let i: number = 0; i < data.length; i++) {
      const item: any = data[i];

      // Prepare the contact state for display.
      const contactState: string = this.transformContactState(item);

      const contactRow: Contact = {
        id: item['_id'],
        contactId: item['contactId'],
        status: item['contactStatus'],
        name: item['contactName'],
        iron: item['contactSatellite'],
        groundStation: item['contactGround'],
        state: contactState
      }
      this.rows.push(contactRow);
    }
  }

  /**
   * Prepares the Contact's state for display in the table.
   * @param item - A Contact record.
   * @return {string} A contact state string formatted for display.
   */
  public transformContactState(item: any): string {

    // If the contact state is unknown, we simply return it unaltered.
    let contactState: string = item['contactState'];

    if (item['contactState'] === 'complete') {
      contactState = CONTACT_STATE.COMPLETE;
    } else if (item['contactState'] === 'executing') {
      contactState = CONTACT_STATE.EXECUTING;
    } else if (item['contactState'] === 'failed') {
      contactState = CONTACT_STATE.FAILED;
    } else if (item['contactState'] === 'upcoming') {
      contactState = CONTACT_STATE.UPCOMING;
    } else if (item['contactState'] === '') {
      contactState = CONTACT_STATE.NOT_AVAILABLE;
    }

    return contactState;
  }

  /**
   * Sorts the table data by a given column name.  If the column is clicked
   * again, the sort direction is toggled.
   * @param {string} column - The name of the column to sort by.  GOTCHA: These
   *   names have to be the same as the Contact property names.
   *   @see {Contact}
   */
  public sortData(column: string): void {

    if (this.rows.length === 0) {
      return; // Bail, there's no data to sort.
    }

    // Step 1: Set the sortColumn and sortDirection.
    if (this.sortColumn === column) {

      // Toggle the sorting direction if the same column was clicked on.
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';

    } else {

      // Set a new column and default to ascending sort order.
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    // Step 2: Sort the rows array.
    this.rows.sort((a: any, b: any): number => {
      const valueA: any = a[column];
      const valueB: any = b[column];

      // Check for null and undefined values.  Place these at the end of the
      // sorted list.
      if (valueA === null || valueA === undefined) {
        return 1; // valueA should appear after valueB.
      }
      if (valueB === null || valueB === undefined) {
        return -1; // valueA should come before valueB.
      }

      // Compare cell values depending on their type.  We return the
      // following values:
      //
      // -1 if valueA should come *BEFORE* valueB.
      //  0 if both valueA and valueB are equal.
      //  1 if valueA should come *AFTER* valueB.
      let comparison: number;

      if (typeof valueA === 'number' && typeof valueB === 'number') {

        // Compare both values as numbers.
        comparison = valueA - valueB;

      } else {

        // Compare both values as strings.
        comparison = String(valueA).localeCompare(String(valueB));
      }

      // Adjust sort order based on the column's current sort direction.
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }
}
