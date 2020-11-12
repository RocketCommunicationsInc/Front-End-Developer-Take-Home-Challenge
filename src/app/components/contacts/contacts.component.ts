import {Component, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {take} from "rxjs/operators";
import {Contact} from "../../model/contact";
import {ColDef} from "ag-grid-community";

@Component({
  selector: "app-contacts",
  templateUrl: "./contacts.component.html",
  styleUrls: ["./contacts.component.scss"]
})
export class ContactsComponent implements OnInit {
  columnDefs: ColDef[] = [
    {
      field: "contactName",
      headerName: "Name",
      sortable: true
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

  contacts: Contact[];
  contactStates: string[];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    // Load data
    this.http.get<Contact[]>("assets/contacts.json").pipe(
      take(1)
    ).subscribe(contacts => {
      this.contacts = contacts;
      const stateSet = new Set<string>();
      this.contacts?.forEach(contact => stateSet.add(contact.contactState));
      this.contactStates = [...stateSet];
    });
  }
}
