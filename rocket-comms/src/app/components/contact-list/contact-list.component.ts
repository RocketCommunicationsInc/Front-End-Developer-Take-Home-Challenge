import {
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Contact} from "../../models/contact.model";
import {
  ContactWithAlertStatus
} from "../../models/contact-with-alert-status.model";
import {Alert} from "../../models/alert.model";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  /**
   * The Contact table filter/search element (text input).
   */
  @ViewChild('searchInput', { static: true })
  searchInput!: ElementRef;

  /**
   * All the Contact data, unfiltered by the search input.
   */
  private allContacts: Array<ContactWithAlertStatus> = [];

  /**
   * This data structure holds the Contact data to be displayed in the Contact
   * table.  Sometimes the data is filtered, sometimes it's not,
   */
  public rows: Array<ContactWithAlertStatus> = [];

  /**
   * The name of the column currently being sorted on.
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

  public ngOnInit(): void {
    // No-op.
  }

  /**
   * Loads the data into the dashboard.
   */
  public loadData(): void {
    if (this.allContacts.length === 0) {

      // NOTE: There is no need to unsubscribe here as our service emits a
      // single value and then completes automatically.
      this.dataService.getData().pipe().subscribe({
        next: (response: Array<Contact>): void => {
          const contactRows: Array<ContactWithAlertStatus> =
            this.buildContactRows(response);
          this.rows = contactRows;

          // IMPORTANT: Save all of the unfiltered Contact row data.  This will
          // be used to restore the table data when a table search filter query
          // has been removed by the user.
          this.allContacts = [...this.rows];

          console.log('Finished loading Contact and Alert data.');
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
    this.allContacts = [];
    this.rows = [];
    this.sortColumn = '';
  }

  /**
   * Builds the Contact row data given the passed-in Contact data.
   * @param {Array<Contact>} data - The Contact data to display
   *   in the table.
   * @returns {Array<ContactWithAlertStatus>} An list of ContactWithAlertStatus
   *   objects.
   */
  public buildContactRows(data: Array<Contact>): Array<ContactWithAlertStatus> {

    const rows: Array<ContactWithAlertStatus> = [];

    for (let i: number = 0; i < data.length; i++) {

      const item: Contact = data[i];

      // NOTE: We perform a deep clone here so as not to alter the passed-in
      // `data` array content.
      const contactRow: ContactWithAlertStatus =
        JSON.parse(JSON.stringify(item));

      contactRow.alertStatus = {}; // Initialize the alertStatus object.

      // Determine if the Contact has any alerts to display.  If so, add them to
      // the alertStatus object.
      if (contactRow.alerts.length > 0) {
        for (let j: number = 0; j < contactRow.alerts.length; j++) {
          const alert: Alert = contactRow.alerts[j];
            contactRow.alertStatus[alert.errorId] = false;
        }
      }

      rows.push(contactRow); // Save the Contact row.
    }

    return rows;
  }

  /**
   * Sorts the table data by the given `columnName`.  If the column is clicked
   * again, the sort direction is toggled.
   * @param {string} columnName - The name of the column to sort by.
   *   GOTCHA: This name needs to be exactly the same as the corresponding
   *   Contact property name we're sorting on.
   *   @see {Contact}
   */
  public sortData(columnName: string): void {

    if (this.rows.length === 0) {
      return; // Bail, there's no data to sort.
    }

    // Step 1: Set the sortColumn and sortDirection.
    if (this.sortColumn === columnName) {

      // The same column was clicked on by the user: toggle the sorting
      // direction.
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';

    } else {

      // Set a new sorting column and default to ascending sort order.
      this.sortColumn = columnName;
      this.sortDirection = 'asc';
    }

    // Step 2: Sort the rows array.
    this.rows.sort((a: any, b: any): number => {
      const valueA: any = a[columnName];
      const valueB: any = b[columnName];

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

    // TODO(gabriel): Write unit tests for this method.
  }

  /**
   * Handler for our "Search..." input.  We'll use this search input to filter
   * the Contact table.
   * @param {Event} event - The 'ruxchange' event containing the search text.
   */
  public filterContactTable(event: Event) {

    // TODO(gabriel):   It seems the event only gets fired when the user
    //  presses the <enter> key when the search text input has focus, which is a
    //  little odd to me.  I suppose this helps to solve the common "debounce
    //  key input problem" often associated with these types of inputs.  Learn
    //  more about how inputs really work within the Astro ecosystem.  I don't
    //  like it when the user clears the search input that they are also forced
    //  to press <enter> afterwards.  Is there a way to handle this "clear
    //  search input" case more elegantly?

    if (this.allContacts.length === 0) {
      return; // Bail: There's no data to search!
    }

    const inputElement = event.target as HTMLInputElement;
    const searchText: string = inputElement.value.toLowerCase().trim();

    if (searchText === '') {

      // GOTCHA: Restore table to full list if search is cleared.
      this.rows = [...this.allContacts];

      return; // Bail: There is no search term.
    }

    this.rows = this.allContacts.filter(contact => {

      const statusMatch =
        contact.contactStatus?.toLowerCase().includes(searchText);
      const nameMatch =
        contact.contactName?.toString().includes(searchText);
      const ironMatch =
        contact.contactSatellite.toLowerCase().includes(searchText);
      const groundStationMatch =
        contact.contactGround?.toLowerCase().includes(searchText);
      const stateMatch =
        contact.contactState?.toLowerCase().includes(searchText);

      if (statusMatch || nameMatch || ironMatch || groundStationMatch ||
        stateMatch) {
        return true;
      }

      return false;
    });
  }
}
