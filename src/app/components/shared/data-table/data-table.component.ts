import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import '@astrouxds/rux-progress';
import { DataTableColumn } from 'src/app/interfaces/column';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent {
  @ViewChild('dataTable', {static: true}) table: any;
  @Input() columns: DataTableColumn[];
  @Input() data: any[] = [];
  @Input() loading = true;
  private sortOrder = 1;

  constructor(private ref: ChangeDetectorRef) { }

  sortColumn(column: string): void {
    this.data = this.data.sort((a, b) => {
      if (typeof a[column] === 'number') {
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
    event.preventDefault();
    event.stopImmediatePropagation();
    row.expanded = !row.expanded;
    this.ref.markForCheck();
  }

}
