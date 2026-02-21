import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AstroComponentsModule } from '@astrouxds/angular';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Alert } from './alert/alert';

@NgModule({
  declarations: [App, Alert],
  imports: [BrowserModule, AppRoutingModule, AstroComponentsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
