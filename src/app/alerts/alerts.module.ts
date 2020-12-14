import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { FlexLayoutModule } from '@angular/flex-layout'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { NgxPaginationModule } from 'ngx-pagination'
import { AlertsEffects } from '@grmAlerts/alerts.effects'
import { AlertsService } from '@grmAlerts/alerts.service'
import { alertsReducers } from '@grmAlerts/alerts.reducer'
import { defaultAlertsState } from '@grmAlerts/alerts.state'
import { AlertsListComponent, AlertsListDisplayComponent } from '@grmAlerts/components/alerts-list/alerts-list.component'
import { AlertsListHeaderComponent,
  AlertsListHeaderDisplayComponent } from '@grmAlerts/components/alerts-list-header/alerts-list-header.component'
import { AlertsListItemComponent,
  AlertsListItemDisplayComponent } from '@grmAlerts/components/alerts-list-item/alerts-list-item.component'
import { AlertSortPipe } from '@grmAlerts/pipes/alert-sort.pipe'
import { AlertFilterPipe } from '@grmAlerts/pipes/alert-filter.pipe'
import { FormatGRMTimePipe } from '@grmCommon/pipes/format-time.pipe'
import '@astrouxds/rux-status'
import '@astrouxds/rux-notification'
import '@astrouxds/rux-progress'
import '@astrouxds/rux-button'

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('alerts', alertsReducers, {
      initialState: defaultAlertsState
    }),
    EffectsModule.forFeature([
      AlertsEffects
    ]),
    FormsModule,
    FlexLayoutModule,
    NgxPaginationModule
  ],
  declarations: [
    AlertsListComponent,
    AlertsListDisplayComponent,
    AlertsListHeaderComponent,
    AlertsListHeaderDisplayComponent,
    AlertsListItemComponent,
    AlertsListItemDisplayComponent,
    AlertSortPipe,
    AlertFilterPipe,
    FormatGRMTimePipe
  ],
  providers: [
    AlertsService
  ],
  exports: [
    AlertsListComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AlertsModule { }
