import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from './dashboard.service';
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

export interface Alert {
  errorCategory: string,
  errorId: string,
  errorMessage: string,
  errorSeverity: string,
  errorTime: number,
  expanded: false,
  longMessage: string,
  new: false
  selected: false
}

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
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
export class AlertsComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['select', 'errorSeverity', 'errorCategory', 'errorTime'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  alerts: any;
  sortField = 'errorTime';
  sortOrder = 'desc';
  pageNumber = 0;
  pageSize = 10;
  totalRows = 0;
  totalSoftware = 0;
  totalHardware = 0;
  totalSpacecraft = 0;
  bulkCheckbox = false;
  //
  expandedElement: Alert;
  //
  severity = [
    {value: 'all', viewValue: 'All'},
    {value: 'caution', viewValue: 'Caution'},
    {value: 'critical', viewValue: 'Critical'},
    {value: 'serious', viewValue: 'Serious'},
  ];
  filterSeverity = 'all'
  selectedSeverity = 'all';

  // Pie Chart
  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      display: true,
      position: 'right',
      // onHover: (e, chartElement) => {
      //   console.log('onHover', chartElement);
      //   //e.target['style'].cursor = chartElement[0] ? 'pointer' : 'default';
      // },
      onClick: (e, legendItem) => {
        // console.log('item legend', legendItem);
        this.filterBySeverity(legendItem.text);
      }
    },
    onClick: (e, legendItem) => {

      if (legendItem.length === 0) { return false; }
      // console.log('item pie', legendItem[0]['_view'].label);
      this.filterBySeverity(legendItem[0]['_view'].label);
    }
  };

  public pieChartLabels: Label[] = [
    'Caution',
    'Serious',
    'Critical',
  ];
  public pieChartData: SingleDataSet = [];
  public pieChartColors: Color[] = [
    {
      // borderColor: 'black',
      borderWidth: 0,
      backgroundColor: [ '#fce83a', '#ffb300', '#ff3838'],
    },
  ];

  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  setPieData() {
    // clean this up
    const caution = this.alerts.filter(o => o.errorSeverity === 'caution');
    const serious = this.alerts.filter(o => o.errorSeverity === 'serious');
    const critical = this.alerts.filter(o => o.errorSeverity === 'critical');
    this.pieChartData = [caution.length, serious.length, critical.length];
  }

  constructor(
    private dashboardService: DashboardService,
  ) { 
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.getAllAlerts();

    
    //Defaults
    this.sort.direction = 'desc';
    this.sort.active = 'errorTime';
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // Get All alerts
  getAllAlerts() {
    const orderBy = (this.sortOrder === 'asc') ? this.sortField : '-' + this.sortField;

    var searchCriteria = {
      orderBy: orderBy,
      limit: this.pageSize,
      offset: (this.pageNumber * this.pageSize),
      // offset: (this.pageNumber - 1) * this.pageSize + 1,
    };

    // if (this.searchKey !== null && this.searchKey !== undefined && this.searchKey !== '') {
    //   searchCriteria['nameStartsWith'] = this.searchKey.trim();
    // }

    // console.log('searchCriteria', searchCriteria);
    this.dashboardService.getAlerts(searchCriteria).subscribe(
      data => {
        console.log('alerts', data.body);
        if (this.pageNumber === 0) {
          this.alerts = data.body;

          // Set Pie Chart
          this.setPieData();

          const defaultSort = { active: this.sortField, direction: this.sortOrder };
          this.sortChanged(defaultSort);

          // this.dataSource = new MatTableDataSource(ds);
        } else {
          // concatenate arrays
          this.alerts = [...this.alerts, ...data.body];
        }
        // Totals
        this.totalRows = data.body.length;
        this.totalSoftware = this.alerts.filter(o => o.errorCategory === 'software').length;
        this.totalHardware = this.alerts.filter(o => o.errorCategory === 'hardware').length;
        this.totalSpacecraft = this.alerts.filter(o => o.errorCategory === 'spacecraft').length;
      },
      error => {

      }
    );

  }

  //
  filterBySeverity(severity) {
    console.log('filterBySeverity', severity);
    this.filterSeverity = severity.toLowerCase();

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
    this.filterSeverity = 'all';
    this.pageNumber = 0;
    this.paginator.pageIndex = 0;
    this.getAllAlerts();
  }

  //Select all files
  selectAllFiles(event: any) {

    console.log('selectAllFiles', this.dataSource);

    if (!this.bulkCheckbox) {
      //Mark all files selected
      this.dataSource.data.forEach(i => { i.selected = true; });
      this.bulkCheckbox = true;
    } else {
      //Mark all files unselected
      this.dataSource.data.forEach(i => { i.selected = false; });
      this.bulkCheckbox = false;
    }
  }

  //Select Row
  // selectRow(row, e) {
  //   // e.stopPropagation();

  //   // Uncheck bulk checkbox
  //   //this.bulkCheckbox = false;
  //   row.selected = !row.selected;
  // }

  // Expand row
  expander(element) {
    this.dataSource.data.forEach(i => 
      { 
        if(element.errorId === i.errorId) {
          element.expanded = !element.expanded;
        } else {
          i.expanded = false; 
        }
      }
    );
  }

  // Sort
  sortChanged(e) {
    // console.log('sortChanged', e);
    this.pageNumber = 0;
    this.paginator.pageIndex = 0;
    //
    this.sortOrder = e.direction;
    this.sortField = e.active;
    // sort local, this should be done on the backend
    this.alerts.sort(this.sortValues(this.sortField, this.sortOrder));
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
    let filtered = this.alerts;

    // Have a filter?
    if (this.filterSeverity !== null && this.filterSeverity !== 'all') {
      // console.log('> haveFilter', this.filterStatus);
      // console.log('> pageNumber', this.pageNumber);
      filtered = filtered.filter(o => o.errorSeverity === this.filterSeverity.toLowerCase());
      this.totalRows = filtered.length;
    }
    //
    this.totalRows = filtered.length;
    this.totalSoftware = filtered.filter(o => o.errorCategory === 'software').length;
    this.totalHardware = filtered.filter(o => o.errorCategory === 'hardware').length;
    this.totalSpacecraft = filtered.filter(o => o.errorCategory === 'spacecraft').length;

    // Close expanded on pagination? Sure
    filtered.forEach(i => { i.expanded = false; }); 

    const start = (this.pageNumber * this.pageSize);
    const end = (start + this.pageSize);
    const ds = filtered.slice(start, end);
    return ds;
  }



}
