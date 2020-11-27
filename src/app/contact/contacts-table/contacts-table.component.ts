import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contacts-table',
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.scss']
})
export class ContactsTableComponent implements OnInit {
  page = 1;
  constacts: Contact[] = [];
  @Input() itemsPerPage: any;
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
    this.pageChanged.emit(page);
  }

}
