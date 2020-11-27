import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatTabsModule } from '@angular/material/tabs';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { 
  MatSortModule,
  MatTableModule 
} from "@angular/material";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LineChartComponent } from './line-chart/line-chart.component';
import { AlertsComponent } from './alerts/alerts.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LineChartComponent,
    AlertsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSortModule, 
    MatTableModule,
    MatTabsModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    ChartsModule
  ],
  providers: [
    ThemeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
