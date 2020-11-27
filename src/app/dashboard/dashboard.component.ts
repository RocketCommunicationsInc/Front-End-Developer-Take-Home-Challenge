import { Component, OnInit, ViewChild, AfterViewInit  } from '@angular/core';
import { stringify } from 'querystring';
import {DataService} from '../data.service'
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  alerts: any[];
  contacts: any[];
  totalContacts: number;
  contactStates: string;
  displayedColumns: string[] = ['contactName', 'contactStatus', 'contactBeginTimestamp', 'contactEndTimestamp'];
  executingDataSource: any;
  failedDataSource: any;
  isLoading = true;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _data: DataService) { }

  // ngAfterViewInit() {
  //   this.isLoading = false;
  // }

  ngOnInit() {

    this._data.getContacts().subscribe(data => {
      const executing = data.filter(item => item.contactState === 'executing');
      console.log(executing.length)
      this.executingDataSource = new MatTableDataSource(executing);
      this.executingDataSource.sort = this.sort;
      this.isLoading = false;
      
      const failed = data.filter(item => item.contactState === 'failed');
      this.failedDataSource = new MatTableDataSource(failed);
      this.failedDataSource.sort = this.sort;

      this.totalContacts = data.length;
      
      // const states = data.map((contact: any) => contact.contactState)
      // this.contactStates = Array.from(new Set<string>(states)).join(', ')
    })
    
  }
}
