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

  // A WORD ABOUT THE TWO CONTACT LISTS:
  //
  // This component uses a "Two Lists" approach to manage Contact data.
  //
  //  1. `allContacts` stores the full dataset and acts as the master source
  //     of truth.
  //
  //  2. `filteredContacts` is a subset of the master list used for UI display
  //     and reflects current search filters being applied.

  /**
   * The full (unfiltered) Contact dataset, including alert state and
   * acknowledgment status.  Acts as the master source of truth.
   */
  private allContacts: Array<ContactWithAlertStatus> = [];

  /**
   * A filtered subset of Contacts used for UI display based on user input
   * as search terms.  When no data filters are active this dataset mirrors
   * `allContacts`.
   */
  public filteredContacts: Array<ContactWithAlertStatus> = [];

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
   * Loads the data into the dashboard and into the necessary supporting
   * Contact lists.
   */
  public loadData(): void {
    if (this.allContacts.length === 0) {

      // NOTE: There is no need to unsubscribe here as our service emits a
      // single value and then completes automatically.
      this.dataService.getData().pipe().subscribe({
        next: (response: Array<Contact>): void => {

          const contactRows: Array<ContactWithAlertStatus> =
            this.buildContactRows(response);
          this.filteredContacts = contactRows;

          // IMPORTANT: Save all of the unfiltered Contact row data into its
          // own master list.  This will be used to restore the displayed table
          // data when search filters have been removed by the user/operator.
          this.allContacts = [...this.filteredContacts];

          // TODO(gabriel): Remove this console.log statement.
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
    this.filteredContacts = [];
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
   * Sorts the Contact table data by the given `columnName`.  If the same column
   * is clicked again, the sort direction is toggles between ascending and
   * descending.
   * @param {string} columnName - The name of the Contact property to sort by.
   *   NOTE: This *MUST EXACTLY MATCH* a property on the Contact model.
   *   See {@link Contact} for available property names.
   */
  public sortData(columnName: string): void {

    if (this.filteredContacts.length === 0) {
      return; // Bail, there's no data to sort.
    }

    // Step 1: Set the current sort column and sort direction.
    if (this.sortColumn === columnName) {

      // The same column was clicked on by the user: toggle the sorting
      // direction.
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';

    } else {

      // Set a new sorting column and default to ascending sort order.
      this.sortColumn = columnName;
      this.sortDirection = 'asc';
    }

    // Step 2: Sort the data.
    this.filteredContacts.sort((a: any, b: any): number => {
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
   * Handler for our "Search..." string input control.  We use this search
   * input to filter the Contact table.
   * @param {Event} event - The 'ruxchange' event containing the search text.
   */
  public filterContactTable(event: Event): void {

    // TODO(gabriel): It seems the event only gets fired when the user
    //  presses the <enter> key when the search text input has focus, which is a
    //  little odd to me.  I suppose this helps to solve the common "debounce
    //  key input problem" often associated with these types of input searches.
    //  Learn more about how inputs and 'ruxchange' events really work within
    //  the Astro ecosystem.  I don't like it when the user clears the search
    //  input they are also forced to press <enter> key afterwards in order to
    //  reset the search results.  Is there a way to handle this "clear search
    //  input" case more elegantly?
    //
    // TODO-UPDATE(gabriel): I think I found a solution (compromise). I'm now
    //  also watching for 'input' events too.  See the onInputChange() method
    //  below for details.

    if (this.allContacts.length === 0) {
      return; // Bail: There's no data to search!
    }

    const inputElement = event.target as HTMLInputElement;
    const searchText: string = inputElement.value.toLowerCase().trim();

    if (searchText === '') {

      // GOTCHA: Restore table to its full dataset if the search filter is
      // cleared.
      this.filteredContacts = [...this.allContacts];

      return; // Bail: There is no search term.
    }

    this.filteredContacts = this.allContacts.filter(
      (contact: ContactWithAlertStatus): boolean => {

        const statusMatch: boolean =
          contact.contactStatus?.toLowerCase().includes(searchText);
        const nameMatch: boolean =
          contact.contactName?.toString().includes(searchText);
        const ironMatch: boolean =
          contact.contactSatellite.toLowerCase().includes(searchText);
        const groundStationMatch: boolean =
          contact.contactGround?.toLowerCase().includes(searchText);
        const stateMatch: boolean =
          contact.contactState?.toLowerCase().includes(searchText);

        // We also search any Alerts associated with the Contact.
        const alertMatch: boolean =
          contact.alerts.some((alert): boolean => {
            const foundAlert: boolean =
              alert.errorSeverity.toLowerCase().includes(searchText) ||
              alert.errorMessage.toLowerCase().includes(searchText);
            return foundAlert;
          });

        if (statusMatch || nameMatch || ironMatch || groundStationMatch ||
          stateMatch || alertMatch) {
          // We found a match!  Include the Contact in the filtered result set.
          return true;
        }

        return false; // Sadly, no Contacts were found.
      });
  }

  /**
   * Handles changes to the search input field.  It only does something when the
   * search field is cleared.  In that case, we restore the Contacts listing
   * to display ALL of the Contacts (unfiltered).  This is just a fix so the
   * user/operator doesn't have to hit the enter key after clearing the search
   * field.
   * @param {Event} event - The 'input' event associated with the search input
   *   form field.
   */
  public onInputChange(event: Event): void {

    // TODO(gabriel): Remove this method if it goes against Rocket's UI/UX
    //  compliance rules.  Verify whether it does.

    const target: HTMLInputElement = event.target as HTMLInputElement;
    const value: string = target.value.trim();
    if (value === '') {
      this.filteredContacts = [...this.allContacts];
    }
  }

  /**
   * Filters Contact data based on the Alert severity level.
   * @param {Event} event - The 'ruxchange' chagne event from the "Alert
   *   Severity" drop-down.
   */
  public filterAlerts(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value : string = target.value;
    console.log('Filter Alert Drop-down value:', value);

    // TODO(gabriel): Implement this method.  Figure out how this control should
    //  interact with the text search filtering.  Maybe I can add this filtering
    //  if I have enough time after implementing other requirements first.
  }
}
