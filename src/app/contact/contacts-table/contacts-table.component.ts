import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contacts-table',
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.scss']
})
export class ContactsTableComponent implements OnInit {
  sortDir = 'asc';
  page = 1;
  constacts: Contact[] = [];
  @Input() itemsPerPage: any;
  @Input() selectedContact: number;
  @Output() pageChanged = new EventEmitter();

  constructor(
    private _contactService: ContactService
  ) { }

  ngOnInit(): void {
    this._contactService.fetchAll().subscribe((res: Contact[]) => {
      this.constacts = res;
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
     if (this.sortDir === 'asc'){
       this.constacts.sort((a: Contact, b: Contact) => a.contactName > b.contactName ? 1 : -1);
     } else {
      this.constacts.sort((a: Contact, b: Contact) => a.contactName < b.contactName ? 1 : -1);
     }
   }

}
