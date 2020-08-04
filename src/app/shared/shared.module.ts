import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { SortComponent } from './sort/sort.component';
import { TimestampPipe } from './timestamp.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    PaginationComponent,
    SortComponent,
    TimestampPipe,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [
    PaginationComponent,
    SortComponent,
    TimestampPipe,
  ]
})
export class SharedModule { }
