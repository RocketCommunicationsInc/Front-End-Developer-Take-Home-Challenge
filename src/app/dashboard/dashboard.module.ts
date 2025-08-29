import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { AlertListComponent } from '../alert-list/alert-list.component';
import { AlertDetailComponent } from '../alert-detail/alert-detail.component';

@NgModule({
  declarations: [DashboardComponent, AlertListComponent, AlertDetailComponent],
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardModule {}
