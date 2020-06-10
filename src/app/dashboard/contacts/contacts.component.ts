import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
//
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
//
import { animate, state, style, transition, trigger } from '@angular/animations';
//
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Color } from 'ng2-charts';
import * as Chart from 'chart.js';

// Interfaces
export interface Contact {
  contactAzimuth: number;
  contactBeginTimestamp: number;
  contactDetail: string;
  contactElevation: number;
  contactEndTimestamp: number;
  contactEquipment: string;
  contactGround: string;
  contactId: string;
  contactLatitude: number;
  contactLongitude: number;
  contactName: number;
  contactResolution: string;
  contactResolutionStatus: string;
  contactSatellite: string;
  contactState: string;
  contactStatus: string;
  contactStep: string;
  expanded: boolean;
}

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    trigger('tableCells', [
      transition(':enter', [ // * => void
        style({ opacity: 0 }),
        animate('1s ease-in',
          style({ opacity: 1 }))
      ]),

    ]),
  ],

})
export class ContactsComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['contactStatus', 'contactName', 'contactGround', 'contactEquipment' , 'contactState', 'contactBeginTimestamp'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  contacts: any;
  sortField = 'contactName';
  sortOrder = 'asc';
  status;
  states;
  pageNumber = 0;
  pageSize = 10;
  totalRows = 0;
  totalExe = 0;
  totalFailed = 0;
  //
  expandedElement: Contact | null;
  //
  filterStatus: any = null;

  // Pie Chart
  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      display: true,
      position: 'right',
      onClick: (e, legendItem) => {
        this.filterByStatus(legendItem.text);
      }
    },
    onClick: (e, legendItem) => {
      if (legendItem.length === 0) { return false; }
      this.filterByStatus(legendItem[0]['_view'].label);
    }
  };

  public pieChartLabels: Label[] = [
    'Normal',
    'Caution',
    'Serious',
    'Critical',
  ];
  public pieChartData: SingleDataSet = [];
  public pieChartColors: Color[] = [
    {
      borderWidth: 0,
      backgroundColor: ['#56f000', '#fce83a', '#ffb300', '#ff3838'],
    },
  ];

  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  setPieData() {
    this.pieChartData = [this.status.normal, this.status.caution, this.status.serious, this.status.critical];
  }

  constructor(
    private dashboardService: DashboardService,
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.getAllContacts();

    //Defaults
    this.sort.direction = 'asc';
    this.sort.active = 'contactName';
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // Get All contacts
  getAllContacts() {

    // This not used in this example, cause we fetch everything here!
    // Typically you don't fetch everything...
    const orderBy = (this.sortOrder === 'asc') ? this.sortField : '-' + this.sortField;

    var searchCriteria = {
      orderBy: orderBy,
      limit: this.pageSize,
      offset: (this.pageNumber * this.pageSize),
      // offset: (this.pageNumber - 1) * this.pageSize + 1,
    };

    this.dashboardService.getContacts(searchCriteria).subscribe(
      data => {
        console.log('contacts', data.body);
        if (this.pageNumber === 0) {
          this.contacts = data.body;
          // this.dataSource = new MatTableDataSource(ds);
        } else {
          // concatenate arrays
          // this.contacts = [...this.contacts, ...data.body];
        }
        // Totals
        this.totalRows = this.contacts.length;
        this.status = this.getCountOfProperty(this.contacts, 'contactStatus')
        this.states = this.getCountOfProperty(this.contacts, 'contactState');
        this.totalExe = this.states.executing;
        this.totalFailed = this.states.failed;
        // Set Pie Chart
        this.setPieData();
        //
        const defaultSort = { active: this.sortField, direction: this.sortOrder };
        this.sortChanged(defaultSort);


      }, error => {

      }, () => {
        //complete
      }
    );

  }

  // Count array property
  getCountOfProperty(obj, prop) {
    let pValue;
    const items = {};
    for (const value of obj) {
      pValue = value[prop];
      
      if (!items[pValue]) {
        items[pValue] = 0;
      }
      items[pValue] += 1;
    }
    return items;
  }

  
  //
  filterByStatus(status) {
    this.filterStatus = status.toLowerCase();
    // reset for filter
    this.pageNumber = 0;
    this.paginator.pageIndex = 0;
    
    const filteredDs = this.getPaginatedSlice();
    // console.log('filteredDs', filteredDs);
    this.dataSource = new MatTableDataSource(filteredDs);
  }

  // Clear filter
  removeFilter() {
    // reset for filter
    this.filterStatus = null;
    this.pageNumber = 0;
    this.paginator.pageIndex = 0;
    this.getAllContacts();
  }

  // Expand row
  expander(element) {
    this.dataSource.data.forEach(i => 
      { 
        if(element.contactId === i.contactId) {
          element.expanded = !element.expanded;
        } else {
          i.expanded = false; 
        }
      }
    );
  }

  // Sort
  sortChanged(e) {
    this.pageNumber = 0;
    this.paginator.pageIndex = 0;
    //
    this.sortOrder = e.direction;
    this.sortField = e.active;
    // sort local, this should be done on the backend
    this.contacts.sort(this.sortValues(this.sortField, this.sortOrder));
    const ds = this.getPaginatedSlice();
    this.dataSource = new MatTableDataSource(ds);

    // this.getAllContacts();
  }

  // Pagination
  // https://material.angular.io/components/paginator/overview
  pageChanged(e) {
    this.pageNumber = e.pageIndex;
    this.pageSize = e.pageSize;
    // console.log(this.pageNumber + '---' + this.pageSize);
    const ds = this.getPaginatedSlice();
    this.dataSource = new MatTableDataSource(ds);

    // this.getAllContacts();
  }

  // Sort
  // array is sorted by band in descending order
  // singers.sort(sortValues('band', 'desc'));
  sortValues(key, order = 'asc') {

    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }
  
      const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  // Fake pagination
  // this should happen on the backend
  // that way you only get the records you asked for, not all
  getPaginatedSlice() {
    let filtered = this.contacts;

    // Have a filter?
    if (this.filterStatus !== null) {
      filtered = filtered.filter(o => o.contactStatus === this.filterStatus.toLowerCase());
    }
    //
    this.totalRows = filtered.length;
    this.totalExe = filtered.filter(o => o.contactState === 'executing').length;
    this.totalFailed = filtered.filter(o => o.contactState === 'failed').length;

    const start = (this.pageNumber * this.pageSize);
    const end = (start + this.pageSize);
    const ds = filtered.slice(start, end);
    return ds;
  }



}
