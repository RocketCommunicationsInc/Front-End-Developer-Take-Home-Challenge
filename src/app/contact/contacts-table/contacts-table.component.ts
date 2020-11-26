import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contacts-table',
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.scss']
})
export class ContactsTableComponent implements OnInit {
  constacts: Contact[] = []
  constructor(
    private _contactService: ContactService
  ) { }

  ngOnInit(): void {
    this._contactService.fetchAll().subscribe((res: Contact[]) => {
      this.constacts = res;
    })
  }

}
