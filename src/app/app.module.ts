import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';

import { SatellitesModule } from './modules/satellites/satellites.module';
import { CoreModule } from './core/core.module';

import '@astrouxds/rux-accordion/rux-accordion.js';
import '@astrouxds/rux-status/rux-status.js';
import '@astrouxds/rux-icon/rux-icon.js';
import '@astrouxds/rux-clock/rux-clock.js';
import '@astrouxds/rux-global-status-bar/rux-global-status-bar.js';

@NgModule({
  declarations: [
    AppComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    CoreModule,
    BrowserModule,
    SatellitesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
