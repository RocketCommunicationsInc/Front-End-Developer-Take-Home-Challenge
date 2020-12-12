import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ContactService } from 'src/app/services/contact/contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactListComponent implements OnInit {

  @ViewChild('errorTimeTemplate', {static: true}) errorTimeTemplate;
  @ViewChild('contactStatus', {static: true}) contactStatusTemplate;
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  availableStatuses: Set<string>;
  showError: boolean = false;
  loading: boolean = true;

  constructor(private service: ContactService, private ref: ChangeDetectorRef) { }

  get columnConfig(): any[] {
    let columns = [
      {
        name: "contactName",
        label: "Name"
      },
      {
        name: "contactStatus",
        cellTemplate: this.contactStatusTemplate,
        label: ""
      },
      {
        name: "contactGround",
        label: "Ground"
      },
      {
        name: "contactSatellite",
        label: "Satellite"
      },
      {
        name: "contactState",
        label: "State"
      },
      {
        name: "contactStep",
        label: "Step"
      },
      {
        name: "contactBeginTimestamp",
        cellTemplate: this.errorTimeTemplate,
        label: "Start"
      },
      {
        name: "contactEndTimestamp",
        cellTemplate: this.errorTimeTemplate,
        label: "End"
      }
    ];
    return columns;
  }

  get criticalErrors(): number {
    return this.contacts.filter(contact => contact.contactStatus =='critical').length;
  }

  ngOnInit() {
    this.getContacts();
  }

  getContacts(): void {
    this.service.getResults().subscribe({
      next: this.onSuccess.bind(this),
      error: this.onFailure.bind(this),
    });
  }


  filterList(status: string): void {
    this.loading = true;
    this.ref.markForCheck();
    if(status == 'all') {
      this.filteredContacts = this.contacts;
    } else {
      this.filteredContacts = this.contacts.filter(contact => status == contact.contactStatus);
    }
    this.loading = false;
    this.ref.markForCheck();

  }

  private setavailableStatuses(): void {
    this.availableStatuses = new Set(this.contacts.map(contact => contact.contactStatus));
  }

  private onSuccess(res: Contact[]): void {
    res.forEach((contact: Contact)=> {
      contact.contactDuration = contact.contactEndTimestamp = contact.contactBeginTimestamp;
      contact.details = contact.contactDetail;
    })
    this.contacts = res;
    this.filteredContacts = res;
    this.setavailableStatuses();
    this.loading = false;
    this.ref.markForCheck();

  }

  private onFailure(): void {
    this.showError = true;
  }


}
