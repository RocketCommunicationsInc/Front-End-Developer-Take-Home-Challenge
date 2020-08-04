import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
})
export class SortComponent {
  sortBy = 'none';
  @Output() sort = new EventEmitter<any>(true);

  constructor() { }

  onClick(): void {
    switch (this.sortBy) {
      case 'none':
        this.sortBy = 'ascending';
        break;
      case 'ascending':
        this.sortBy = 'descending';
        break;
      case 'descending':
        this.sortBy = 'none';
        break;
    }
    this.sort.emit(this.sortBy);
  }
}
