import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AstroComponentsModule} from "@astrouxds/angular";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AstroComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
