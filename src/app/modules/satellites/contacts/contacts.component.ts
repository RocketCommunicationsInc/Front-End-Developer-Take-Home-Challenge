import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/core/api.service';
import { Contact } from 'src/app/core/contact.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
})
export class ContactsComponent implements OnInit {
  allContacts: Contact[] = [];
  contactsPage: Contact[];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getContacts().subscribe((contacts: Contact[]) =>
      this.allContacts = contacts
    );
  }

  onChangePage(page: Contact[]): void {
    this.contactsPage = page;
  }

  onSort(sortBy): void {
    const sortFns = {
      ascending: (a, b) => {
        if (a.contactName > b.contactName) { return 1; }
        if (b.contactName > a.contactName) { return -1; }
        return 0;
      },
      descending: (a, b) => {
        if (a.contactName > b.contactName) { return -1; }
        if (b.contactName > a.contactName) { return 1; }
        return 0;
      },
      none: (a, b) => {
        if (a.contactBeginTimestamp > b.contactBeginTimestamp) { return -1; }
        if (b.contactBeginTimestamp > a.contactBeginTimestamp) { return 1; }
        return 0;
      }
    };
    this.allContacts = [...this.allContacts.sort(sortFns[sortBy])];
  }

  get contactStates(): {failed: number, executing: number} {
    const states = {
      failed: 0,
      executing: 0,
    };
    this.allContacts.map(item =>
      item.contactState === 'failed' ? (states.failed++) : (states.executing++)
    );
    return states;
  }

}
