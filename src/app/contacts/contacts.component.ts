import { Component, AfterContentChecked, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  providers: [MatSort, MatTableDataSource]
})
export class ContactsComponent implements AfterContentChecked {
  displayedColumns: string[] = ['contactName', 'contactStatus', 'contactBeginEndTimestamp']
  dataSource: any
  totalContacts: number
  totalUniqueStates: Array<string>

  @ViewChild(MatSort) sort: MatSort

  constructor() {}

  ngAfterContentChecked(): void {
    this.dataSource = new MatTableDataSource(JSON.parse(localStorage.getItem('contactsData')))
    this.dataSource.sort = this.sort
    this.totalContacts = this.dataSource.filteredData.length
    this.totalUniqueStates = this.dataSource.filteredData.filter((value, index, self) => {
      return self.findIndex(v => v.contactState === value.contactState) === index
    })
  }

}
