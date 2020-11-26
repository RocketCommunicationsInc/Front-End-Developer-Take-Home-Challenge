import { NgModule } from '@angular/core';
import { AlertsTableComponent } from './alerts-table/alerts-table.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [AlertsTableComponent],
  imports: [
    SharedModule
  ],
  exports: [AlertsTableComponent]
})
export class AlertModule { }
