import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import '@astrouxds/rux-progress';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent {
  @ViewChild('dataTable', {static: true}) table: any;
  @Input() columns: any[];
  @Input() data: any[] = [];
  @Input() loading = true;
  private sortOrder = 1;

  constructor(private ref: ChangeDetectorRef) { }

  sortColumn(column): void {
    this.data = this.data.sort((a, b) => {
      if (typeof a[column] == 'number') {
        return (a[column] - b[column]) * this.sortOrder;
      } else {
        return a[column].localeCompare(b[column]) * this.sortOrder;
      }

    });
    this.sortOrder = this.sortOrder * -1;
    this.ref.markForCheck();
  }

  trackBy(index, item) {
    if (item) {
      return item.name;
    }
  }

  expandRow(event, row) {
    event.stopPropagation();
    event.preventDefault();
    row.expanded = !row.expanded;
    this.ref.markForCheck();
  }

}
