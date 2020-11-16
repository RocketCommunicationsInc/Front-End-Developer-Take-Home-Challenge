import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit} from "@angular/core";
import {takeUntil} from "rxjs/operators";
import {Contact} from "../../model/contact";
import {ColDef} from "ag-grid-community";
import {DataPathsService, DataPathsToken} from "../../modules/data-load/model/data-paths.service";
import {DataService, DataServiceToken} from "../../modules/data-load/model/data.service";
import {Subject} from "rxjs";

/**
 * Component that shows the current contacts in a table view
 */
@Component({
  selector: "app-contacts",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./contacts.component.html",
  styleUrls: ["./contacts.component.scss"]
})
export class ContactsComponent implements OnInit, OnDestroy {
  /**
   * Column definitions for the table
   */
  readonly columnDefs: ColDef[] = [
    {
      field: "contactName",
      headerName: "Name",
      sortable: true,
      sort: "asc"
    },
    {
      field: "contactStatus",
      headerName: "Status",
      cellClassRules: {
        "cell-status-normal": params => params.value === "normal",
        "cell-status-critical": params => params.value === "critical",
        "cell-status-caution": params => params.value === "caution",
        "cell-status-serious": params => params.value === "serious"
      }
    },
    {
      field: "contactBeginTimestamp",
      headerName: "Begin Timestamp"
    },
    {
      field: "contactEndTimestamp",
      headerName: "End Timestamp"
    }
  ];

  /**
   * Current set of contacts to be shown in the table
   */
  contacts: Contact[];
  /**
   * All unique contact states
   */
  contactStates: string[];

  private readonly onDestroy = new Subject<void>();

  /**
   * ctor
   * @param dataPaths
   * @param dataService
   * @param changeDetectorRef
   */
  constructor(@Inject(DataPathsToken) private readonly dataPaths: DataPathsService,
              @Inject(DataServiceToken) private readonly dataService: DataService,
              private readonly changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    // Load contacts and determine unique set of states
    this.dataService.getData<Contact>(this.dataPaths.getContactsPath()).pipe(
      takeUntil(this.onDestroy)
    ).subscribe(contacts => {
      this.contacts = contacts;
      const stateSet = new Set<string>();
      this.contacts?.forEach(contact => stateSet.add(contact.contactState));
      this.contactStates = [...stateSet];
      this.changeDetectorRef.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
