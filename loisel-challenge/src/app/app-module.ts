import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AstroComponentsModule } from '@astrouxds/angular';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { AlertCard } from './alert/alert-card';
import { MatSortModule } from '@angular/material/sort';
@NgModule({
  declarations: [App, AlertCard],
  imports: [BrowserModule, AppRoutingModule, AstroComponentsModule, MatSortModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
