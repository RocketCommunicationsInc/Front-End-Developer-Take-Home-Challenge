import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { DataTableColumn } from 'src/app/interfaces/column';
import { ContactService } from 'src/app/services/contact/contact.service';
import '@astrouxds/rux-timeline';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {

  @ViewChild('errorTimeTemplate', {static: true}) errorTimeTemplate;
  @ViewChild('contactStatus', {static: true}) contactStatusTemplate;
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  availableStatuses: Set<string>;
  showError = false;
  loading = true;
  startTime = new Date(1563753780000);
  timelineData = [];

  constructor(private service: ContactService, private ref: ChangeDetectorRef) { }

  get columnConfig(): DataTableColumn[] {
    const columns = [
      {
        name: 'contactName',
        label: 'Name'
      },
      {
        name: 'contactStatus',
        cellTemplate: this.contactStatusTemplate,
        label: ''
      },
      {
        name: 'contactGround',
        label: 'Ground'
      },
      {
        name: 'contactSatellite',
        label: 'Satellite'
      },
      {
        name: 'contactState',
        label: 'State'
      },
      {
        name: 'contactStep',
        label: 'Step'
      },
      {
        name: 'contactBeginTimestamp',
        cellTemplate: this.errorTimeTemplate,
        label: 'Start'
      },
      {
        name: 'contactEndTimestamp',
        cellTemplate: this.errorTimeTemplate,
        label: 'End'
      }
    ];
    return columns;
  }

  get criticalErrors(): number {
    return this.contacts.filter(contact => contact.contactStatus === 'critical').length;
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
    if (status === 'all') {
      this.filteredContacts = this.contacts;
    } else {
      this.filteredContacts = this.contacts.filter(contact => status === contact.contactStatus);
    }
    this.loading = false;
    this.ref.markForCheck();

  }

  processTimelineData(contacts: Contact[]): void {

    let tracks = [];
    contacts.forEach((contact) => {
      let currentTrackIndex = tracks.findIndex(track => track.label === contact.contactGround);
      let startTime =  new Date(contact.contactBeginTimestamp * 1000)
      let endTime =  new Date(contact.contactEndTimestamp * 1000)

      // Change Day/Month/Year to today
      // TODO: update docs at https://astro-components.netlify.app/?path=/story/components-timeline--timeline for date range
      startTime.setDate((new Date()).getDate());
      startTime.setMonth((new Date()).getMonth());
      startTime.setFullYear((new Date()).getFullYear());
      endTime.setDate((new Date()).getDate());
      endTime.setMonth((new Date()).getMonth());
      endTime.setFullYear((new Date()).getFullYear());

      let region = {
        startTime: startTime,
        endTime: endTime,
        label: contact.contactEquipment,
        status: contact.contactStatus
      };
      if (currentTrackIndex === -1) {
        tracks.push({
          label: contact.contactGround,
          regions: [region]
        })
      } else {
        tracks[currentTrackIndex].regions.push(region)
      }
    })

    this.timelineData = tracks;
  }

  private setavailableStatuses(): void {
    this.availableStatuses = new Set(this.contacts.map(contact => contact.contactStatus));
  }

  private onSuccess(res: Contact[]): void {
    this.processTimelineData(res);
    res.forEach((contact: Contact) => {
      contact.contactDuration = contact.contactEndTimestamp = contact.contactBeginTimestamp;
      contact.details = contact.contactDetail;
    });
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
