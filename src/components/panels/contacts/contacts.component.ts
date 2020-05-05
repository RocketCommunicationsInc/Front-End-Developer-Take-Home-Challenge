import { Component, OnInit, ViewChild } from '@angular/core';
import { Contact } from '../../../models/contact';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ContactsService } from '../../../services/contacts.service';
import { MatPaginator } from '@angular/material/paginator';
import { TimeUtilsService } from 'src/services/time-utils.service';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'status', 'time'];

  contactsCount: number;
  executingCount: number;
  failedCount: number;

  contactsDataSource: MatTableDataSource<Contact>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private contactsService: ContactsService, private timeUtilsService: TimeUtilsService) { }

  ngOnInit(): void {
    this.contactsService.getContacts().subscribe( data => {
      const parsedData = this.parse(data);

      this.executingCount = parsedData.filter((d) => d.state === "executing").length;
      this.failedCount = parsedData.filter((d) => d.state === "failed").length;

      this.contactsDataSource = new MatTableDataSource(parsedData);
      this.contactsDataSource.sort = this.sort;
      this.contactsDataSource.paginator = this.paginator;

      this.contactsCount = this.contactsDataSource.data.length;
    });
  }

  parse(data: any) : Contact[] {
    const contacts: Contact[] = [];
      data.forEach(d => {

        let contact: Contact = {
          id: d._id,
          state: d.contactState,
          name: d.contactName,
          status: d.contactStatus,
          time: this.timeUtilsService.getBeginEndTimestampDisplayFormat(this.timeUtilsService.getUTCTimeDisplayFormat(d.contactBeginTimestamp), this.timeUtilsService.getUTCTimeDisplayFormat(d.contactEndTimestamp))
        }

        contacts.push(contact);
      });

    return contacts;
  }
}
