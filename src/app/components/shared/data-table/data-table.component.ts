import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import '@astrouxds/rux-progress';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit {
  @ViewChild('dataTable', {static: true}) table: any;
  @Input() columns: any[];
  @Input() data: any[] = [];
  @Input() loading: boolean = true;
  private sortOrder: number = 1;

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.disableTableEvents();
  }

  sortColumn(column): void {
    this.data = this.data.sort((a, b) => {
      if(typeof a[column] == 'number'){
        return (a[column] - b[column]) * this.sortOrder;
      } else {
        return a[column].localeCompare(b[column]) * this.sortOrder;
      }

    });
    this.sortOrder = this.sortOrder * -1;
    this.ref.markForCheck();
  }

  trackBy(index, item) {
    if(item) {
      return item.name;
    }
  }


  private disableTableEvents(): void {
    window.addEventListener('mouseenter', function (event) {
      event.stopPropagation();
    }, true);
    window.addEventListener('mousedown', function (event) {
      event.stopPropagation();
    }, true);
    window.addEventListener('mousemove', function (event) {
      event.stopPropagation();
    }, true);
  }

}
