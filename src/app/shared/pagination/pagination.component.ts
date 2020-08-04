import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import paginate from 'jw-paginate';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() items: Array<any>;
  @Output() changePage = new EventEmitter<any>(true);
  @Input() initialPage = 1;
  @Input() pageSize = 15;
  @Input() maxPages = 10;

  pager: any = {};

  ngOnInit(): void {
    if (this.items && this.items.length) {
      this.setPage(this.initialPage);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.items.currentValue !== changes.items.previousValue) {
        this.setPage(this.initialPage);
    }
  }

  setPage(page: number): void {
    this.pager = paginate(this.items.length, page, this.pageSize, this.maxPages);
    const pageOfItems = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.changePage.emit(pageOfItems);
  }
}
