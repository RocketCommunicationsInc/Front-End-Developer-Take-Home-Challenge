import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contacts-table',
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.scss']
})
export class ContactsTableComponent implements OnInit {
  totalStates = 0;
  sortDir = 'asc';
  page = 1;
  contacts: Contact[] = [];
  @Input() itemsPerPage: any;
  @Input() selectedContact: number;
  @Output() pageChanged = new EventEmitter();

  constructor(
    private _contactService: ContactService
  ) { }

  ngOnInit(): void {
    this._contactService.fetchAll().subscribe((res: Contact[]) => {
      this.contacts = res;
      this.setTotalContactStates();
    });
  }

  onPageChange(page: any): void{
    this.page = page;
    this.pageChanged.emit(this.page);
  }

   onChangeSortDir(): void{
     this.page = 1;
     this.pageChanged.emit(this.page);
     this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
     this.contacts = this._contactService.sortContacts(this.sortDir);
   }

   setTotalContactStates(): void{
     this.totalStates = Array.from(new Set(this.contacts.map((c: Contact) => c.contactState))).length;
   }

}
