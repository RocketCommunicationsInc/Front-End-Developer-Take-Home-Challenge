import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FlexLayoutModule } from '@angular/flex-layout'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { AlertsEffects } from './alerts.effects'
import { AlertsService } from './alerts.service'
import { alertsReducers } from './alerts.reducer'
import { defaultAlertsState } from './alerts.state'
import { AlertsListComponent, AlertsListDisplayComponent } from './components/alerts-list/alerts-list.component'
import { AlertsListHeaderComponent, AlertsListHeaderDisplayComponent } from './components/alerts-list-header/alerts-list-header.component'
import { AlertsListItemComponent, AlertsListItemDisplayComponent } from './components/alerts-list-item/alerts-list-item.component'
import { AlertSortPipe } from './pipes/alert-sort.pipe'
import { AlertErrorTimePipe } from './pipes/alert-error-time.pipe'
import '@astrouxds/rux-status'

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('alerts', alertsReducers, {
      initialState: defaultAlertsState
    }),
    EffectsModule.forFeature([
      AlertsEffects
    ]),
    FlexLayoutModule
  ],
  declarations: [
    AlertsListComponent,
    AlertsListDisplayComponent,
    AlertsListHeaderComponent,
    AlertsListHeaderDisplayComponent,
    AlertsListItemComponent,
    AlertsListItemDisplayComponent,
    AlertSortPipe,
    AlertErrorTimePipe
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
