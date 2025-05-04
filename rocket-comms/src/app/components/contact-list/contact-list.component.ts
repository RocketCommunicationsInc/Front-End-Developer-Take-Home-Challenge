import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Contact} from "../../models/contact.model";
import {
  ContactWithAlertStatus
} from "../../models/contact-with-alert-status.model";
import {Alert} from "../../models/alert.model";
import {RuxDialog, RuxInput} from "@astrouxds/angular";
import {BlockUI, NgBlockUI} from "ng-block-ui";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  /**
   * The handle on the <block-ui> element used to block the Contact table
   * when data is being loaded into the Contact table.
   */
  @BlockUI('tableBlock') tableBlockUI!: NgBlockUI;

  /**
   * A reference to the "Clear Data Confirmation" dialog.
   */
  @ViewChild('clearDataConfirmDialog', { static: false })
  clearDataConfirmDialog!: RuxDialog;

  /**
   * A reference to the "Test Data Already Loaded" info dialog.
   */
  @ViewChild('dataAlreadyLoadedDialog', { static: false })
  dataAlreadyLoadedDialog!: RuxDialog;

  /**
   * A reference to the Alert Dialog.
   */
  @ViewChild('alertDialog', { static: false })
  alertDialogRef!: RuxDialog;

  /**
   * A reference to the search rux-input.
   */
  @ViewChild('searchInput', { static: false})
  searchInputRef!: RuxInput;

  // A WORD ABOUT THE TWO CONTACT LISTS:
  //
  // This component uses a "Two Lists" approach to manage Contact data.
  //
  //  1. `allContacts` stores the full dataset and acts as the master source
  //     of truth.
  //
  //  2. `filteredContacts` is a subset of allContacts, used for UI display and
  //     reflecting any active search filters. Note: filteredContacts contains
  //     shallow copies of the contacts, meaning each contact reference is
  //     shared with the corresponding contact objects in allContacts.

  /**
   * The full (unfiltered) Contact dataset, including alert state and
   * acknowledgment status.  Acts as the master source of truth.
   */
  private allContacts: Array<ContactWithAlertStatus> = [];

  /**
   * A filtered subset of Contacts used for UI display based on user input
   * search terms.  When no data filters are active this dataset mirrors
   * `allContacts`.
   */
  public filteredContacts: Array<ContactWithAlertStatus> = [];

  /**
   * A reference to the currently selected Contact shown in the Alert dialog.
   */
  public selectedContact: ContactWithAlertStatus | null = null;

  /**
   * The currently selected Contact's Begin time.
   */
  public selectedContactBeginTime: string = '';

  /**
   * The currently selected Contact's End time.
   */
  public selectedContactEndTime: string = '';

  /**
   * The currently selected Contact's duration, the delta between their end
   * and begin times.
   */
  public selectedContactDuration: string = '';

  /**
   * The name of the column currently being sorted on.
   */
  public sortColumn: string = '';

  /**
   * The current sort direction.  Can be 'asc' for ascending or 'desc'
   * for descending.
   */
  public sortDirection: 'asc' | 'desc' = 'asc';

  /**
   * A flag used to trigger an indicator in the UI informing the user that a
   * text search filter is being applied to the Contact table.
   */
  public textFilterApplied: boolean = false;

  /**
   * Search text entered by the user used to filter search results.
   */
  public searchTerm: string = '';

  /**
   * A boolean to keep track of the "Only Show Alerts" checkbox search filter.
   */
  public showOnlyAlerts: boolean = false;

  constructor(private dataService: DataService) {
    // No-op.
  }

  public ngOnInit(): void {
    // No-op.
  }

  /**
   * Loads the test dataset into the dashboard/table.
   */
  public loadData(): void {
    if (this.allContacts.length === 0) {

      this.tableBlockUI.start('Loading Data...');

      // NOTE: There is no need to unsubscribe here as our service emits a
      // single value and then completes automatically.
      this.dataService.getData().pipe().subscribe({
        next: (response: Array<Contact>): void => {

          // NOTE: This setTimeout is just to simulate the data taking a moment
          // to load so you can see the Block-UI overlay at work.  In a real
          // app we would never do such a thing, but for this demo I felt it
          // made this data load operation seem more real.
          setTimeout(() => {

            // Build the master dataset and store it in `allContacts`.  This list
            // will be used to restore the displayed table data when search
            // filters have been cleared.
            const contactRows: Array<ContactWithAlertStatus> =
              this.buildContactRows(response);

            // BIZ-RULE: The alerts are sorted by error time (errorTime) with
            // the most recent at the top.
            const contactRowsWithSortedAlerts: Array<ContactWithAlertStatus> =
              this.sortAlertsByErrorTime(true, contactRows);

            this.allContacts = contactRowsWithSortedAlerts;

            // IMPORTANT: Create a shallow copy of `allContacts` for filtering
            // purposes.  The individual contact objects are shared, so changes
            // to a contact in `filteredContacts` will also be reflected in
            // allContacts.
            this.filteredContacts = [...this.allContacts];

            this.tableBlockUI.stop();
          }, 300);
        },
        error: (err: any): void => {
          console.error('Error loading data:', err);
          this.tableBlockUI.stop();

          // TODO(gabriel): Show an error to the user explaining no data could
          //  be loaded in the dashboard.
        }
      });
    } else {
      // Show an informational message to the user informing them the data is
      // already loaded.
      this.dataAlreadyLoadedDialog.open = true;
    }
  }

  /**
   * Clears the data from the dashboard.
   */
  public onClearData(event: Event): void {
    const customEvent = event as CustomEvent;
    const result: boolean = customEvent.detail;
    if (result) {
      this.allContacts = [];
      this.filteredContacts = [];

      this.sortColumn = '';

      // Clear out the search input field.
      this.textFilterApplied = false;
      this.searchInputRef.value = '';

      // Uncheck the "Show Only Alerts" checkbox.
      this.showOnlyAlerts = false;
    }
  }

  /**
   * Opens the "Clear data?" confirmation dialog.
   */
  public openClearDataConfirmDialog(): void {
    this.clearDataConfirmDialog.open = true;
  }

  /**
   * Builds the Contact row data given the passed-in Contact data.
   * @param {Array<Contact>} data - The Contact data to display
   *   in the table.
   * @returns {Array<ContactWithAlertStatus>} A list of ContactWithAlertStatus
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

          // Set the default "Alert acknowledgement" value.
          contactRow.alertStatus[alert.errorId] = false;
        }
      }

      rows.push(contactRow); // Save the Contact row.
    }

    return rows;
  }

  /**
   * Sorts the Alerts for each Contact by error time.
   * @param {boolean} showMostRecentErrorsFirst - If true, sorts Alerts in
   *   descending order (newest first); otherwise, ascending (oldest first).
   * @param {Array<ContactWithAlertStatus>} contacts - The list of Contacts
   *   whose Alerts will be sorted.
   * @returns {Array<ContactWithAlertStatus>} - The updated contacts list with
   *   sorted alerts.
   */
  public sortAlertsByErrorTime(showMostRecentErrorsFirst: boolean,
    contacts: Array<ContactWithAlertStatus>): Array<ContactWithAlertStatus> {

    // TODO(gabriel): Looking at the data in the test file I see that Contacts
    //  with more than one Alert/Error show the times being the same or already
    //  sorted in descending order (with the most recent error first).

    const contactsWithSortedAlerts: Array<ContactWithAlertStatus> =
      contacts.map((contact: ContactWithAlertStatus) => {
        let alerts: Array<Alert> = [];
        if (Array.isArray(contact.alerts)) {
          alerts =  [...contact.alerts];
        }

        const sortedAlerts = alerts.sort((a: Alert, b: Alert): number => {
          const aHasTime = typeof a.errorTime === 'number';
          const bHasTime = typeof b.errorTime === 'number';

          // If neither alert has a valid errorTime, treat them as equal.
          if (!aHasTime && !bHasTime) {
            return 0;
          }

          // If A is missing errorTime, place it after B.
          if (!aHasTime) {
            return 1;
          }

          // If B is missing errorTime, place it after A.
          if (!bHasTime) {
            return -1;
          }

          if (showMostRecentErrorsFirst) {
            // Sort descending: most recent errors first.
            return b.errorTime - a.errorTime;
          } else {
            // Sort ascending: oldest errors first.
            return a.errorTime - b.errorTime;
          }
        });

        const contactWithSortedAlerts = {
          ...contact,
          alerts: sortedAlerts
        };

        return contactWithSortedAlerts;
      });
    return contactsWithSortedAlerts;
  }

  /**
   * Sorts the Contact table data by the given `columnName`.  If the same column
   * is clicked again, the sort direction is toggled between ascending and
   * descending.
   * @param {string} columnName - The name of the Contact property to sort by.
   *   NOTE: This name *MUST EXACTLY MATCH* a property on the Contact model.
   *   See {@link Contact} for available property names.
   * @param {boolean} [avoidToggle] - An optional parameter whose default value
   *   is false.  This parameter is needed (and set to true) so that the search
   *   filtering plays nicely with column sorting behavior.
   *   See the {@link applyFilters} method for details.
   */
  public sortDataByColumn(
    columnName: string, avoidToggle: boolean = false): void {

    if (this.filteredContacts.length === 0) {
      return; // Bail, there's no data to sort.
    }

    // Step 1: Set the current sort column and sort direction.
    if (this.sortColumn === columnName) {

      if (!avoidToggle) {

        // The same column was clicked on by the user: toggle the sorting
        // direction.
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      }

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

    // TODO(gabriel): Write unit tests for this method if time allows.
  }

  /**
   * Applies the "Search..." text and/or "Show Only Alert" filters to the
   * Contact data.
   */
  public applyFilters(): void {

    this.filteredContacts = this.allContacts.filter(
      (contact: ContactWithAlertStatus): boolean => {

        // We search the following Contact properties:
        const statusMatch: boolean =
          contact.contactStatus?.toLowerCase().includes(this.searchTerm);
        const nameMatch: boolean =
          contact.contactName?.toString().includes(this.searchTerm);
        const ironMatch: boolean =
          contact.contactSatellite.toLowerCase().includes(this.searchTerm);
        const groundStationMatch: boolean =
          contact.contactGround?.toLowerCase().includes(this.searchTerm);
        const stateMatch: boolean =
          contact.contactState?.toLowerCase().includes(this.searchTerm);

        // We also search any Alerts associated with the Contact and try to
        // match the search term with error severity and error message text.
        const alertTextMatch: boolean =
          contact.alerts.some((alert): boolean => {
            const foundAlert: boolean =
              alert.errorSeverity.toLowerCase().includes(this.searchTerm) ||
              alert.errorMessage.toLowerCase().includes(this.searchTerm);
            return foundAlert;
          });

      const matchesTextSearch = (statusMatch || nameMatch || ironMatch ||
        groundStationMatch || stateMatch || alertTextMatch);

      const contactHasAtLeastOneAlert =
        Object.keys(contact.alertStatus).length > 0;

      let matchFound: boolean = false;
      if (this.showOnlyAlerts) {
        matchFound = contactHasAtLeastOneAlert && matchesTextSearch;
      } else {
        matchFound = matchesTextSearch;
      }

      this.textFilterApplied = this.searchTerm.trim().length > 0;
      return matchFound;
    });

    // If we're already sorting by a column, we want to maintain the current
    // sorting direction.  We don't want to toggle it.
    if (this.sortColumn) {
      this.sortDataByColumn(this.sortColumn, true);
    }
  }

  /**
   * Handler for our "Search..." string input control.  We use this search
   * filter to search for text within the Contact table.
   * @param {Event} event - The 'ruxchange' event containing the search text.
   */
  public filterContactTableViaSearch(event: Event): void {

    // TODO(gabriel): It seems the event only gets fired when the user
    //  presses the <enter> key when the search text input has focus, which is a
    //  little odd to me.  I suppose this helps to solve the common "debounce
    //  key input problem" often associated with these types of input searches.
    //  Learn more about how inputs and 'ruxchange' events really work within
    //  the Astro ecosystem.  I don't like it when the user clears the search
    //  input they are also forced to press <enter> key afterwards in order to
    //  reset the search results, but there may be UX benefits to this too.
    //  Is there a way to handle this "clear search input" case more elegantly
    //  without having to press the <enter>?
    //
    // TODO-UPDATE(gabriel): I experimented by also watching for 'input' events
    //  on the rux-input but decided to abandon my solution due to a lack
    //  of time and some complexities it created.  The user will just have to
    //  hit the <enter> key after clearing the search text.  :)

    if (this.allContacts.length === 0) {
      return; // Bail: There's no data to search!
    }

    const inputElement = event.target as HTMLInputElement;
    this.searchTerm = inputElement.value.toLowerCase().trim();
    this.applyFilters();
  }

  /**
   * Handler for the "Only Show Alerts" checkbox.
   * @param {Event} event - The 'ruxchange' event fired by the rux-checkbox.
   */
  public onAlertsCheckboxClick(event: Event): void {
    const checkbox = event.target as HTMLRuxCheckboxElement;
    this.showOnlyAlerts = checkbox.checked;
    this.applyFilters();
  }

  /**
   * Resets the data to its original load sorting order and then applies any
   * filters.
   */
  public clearColumnSorting(): void {
    this.sortColumn = '';
    this.sortDirection = 'asc';
    this.filteredContacts = [...this.allContacts];
    this.applyFilters();
  }

  /**
   * Opens the Alert (modal) Dialog for a specific Contact.
   * @param {ContactWithAlertStatus} contactRow - The Contact who has at least
   *   one Alert.
   */
  public openAlertDetailsDialog(contactRow: ContactWithAlertStatus): void {

    // Load the selected contact into the dialog.
    this.selectedContact = contactRow;

    this.formatContactBeginAndEndTimestamps(this.selectedContact);

    // Open the dialog.
    if (this.selectedContact !== null) {
      this.alertDialogRef.open = true;
    } else {
      // TODO(gabriel): Houston, we have a problem.  Is this use-case even
      //  possible?  I don't think so, but let's be safe.  If it is possible,
      //  better error handling is needed.
      console.error('Unable to show Alert Details.');
    }
  }

  /**
   * Formats the selected Contact begin and end timestamps.  Also, computes a
   * contact duration time between the 2 timestamps.
   * @param {ContactWithAlertStatus} selectedContact - The selected contact
   *   shown in the Alert Details dialog.
   */
  public formatContactBeginAndEndTimestamps(
    selectedContact: ContactWithAlertStatus): void {

    // Format begin and end times for display.
    this.selectedContactBeginTime =
      this.formatTimestamp(selectedContact.contactBeginTimestamp);
    this.selectedContactEndTime =
      this.formatTimestamp(selectedContact.contactEndTimestamp);

    // Format the duration between the two times.
    this.selectedContactDuration =
      this.formatDuration(selectedContact.contactBeginTimestamp,
      selectedContact.contactEndTimestamp);
  }

  /**
   * Formats a Unix timestamp in the following format "YYYY-MM-DD HH:MM:SS",
   * e.g., 2019-07-22 00:00:17
   * @param {number} unixTimestampInSeconds - The timestamp to format.
   * @returns {string} A formatted datetime string.
   */
  public formatTimestamp(unixTimestampInSeconds: number): string {

    // TODO(gabriel): Normally I would gather requirements about how the
    //  timestamp should be formatted.  In this case, however, let's just
    //  assume the requirement is to show the timestamp in the following
    //  way: 2019-07-22 00:00:17

    // NOTE: The Date() constructor needs millis, not seconds.
    const date = new Date(unixTimestampInSeconds * 1000);

    // Convert to an ISO string format: 2025-05-02T17:03:21.123Z
    const isoString: string = date.toISOString();

    // Remove millis.
    const isoStringWithoutMillis: string = isoString.split('.')[0];

    // Parse remaining parts.
    const parsedString: string[] = isoStringWithoutMillis.split('T');
    const datePart: string = parsedString[0];
    const timePart: string = parsedString[1];

    // Viola! "YYYY-MM-DD HH:MM:SS"
    const formattedTimestamp: string = datePart + ' ' + timePart;
    return formattedTimestamp;

    // TODO(gabriel): Write unit tests for this method.
  }

  /**
   * Compute the duration between the two passed-in times.
   * @param {number} unixBeginTime - The beginning time in Unix time
   *   (in seconds).
   * @param {number} unixEndTime - The ending time in Unix time (in seconds).
   * @returns {string} The duration in HH:MM:SS format, e.g., 00:00:17 for
   *   17 seconds.
   */
  public formatDuration(unixBeginTime: number, unixEndTime: number): string {

    const diffInSeconds: number = unixEndTime - unixBeginTime;

    const hours: number = Math.floor(diffInSeconds / 3600);
    const minutes: number = Math.floor((diffInSeconds % 3600) / 60);
    const seconds: number = diffInSeconds % 60;

    const formattedDuration: string =
      `${hours.toString().padStart(2, '0')}:` +
      `${minutes.toString().padStart(2, '0')}:` +
      `${seconds.toString().padStart(2, '0')}`;

    return formattedDuration;

    // TODO(gabriel): Write unit tests for this method.
  }

  /**
   * Acknowledges an Alert error corresponding to the passed-in Alert error ID.
   * @param {string} alertErrorId - The Alert error ID.
   * @param {ContactWithAlertStatus} selectedContact - The Contact who has the
   *   Alert error.
   */
  public ackAlert(
    alertErrorId: string, selectedContact: ContactWithAlertStatus): void {
    selectedContact.alertStatus[alertErrorId] = true;
  }
}
