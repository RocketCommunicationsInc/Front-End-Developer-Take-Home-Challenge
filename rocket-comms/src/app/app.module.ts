import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AstroComponentsModule} from "@astrouxds/angular";
import {HttpClientModule} from "@angular/common/http";
import { ContactListComponent } from './components/contact-list/contact-list.component';
import {SharedModule} from "./shared/shared.module";
import {BlockUIModule} from "ng-block-ui";

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    AstroComponentsModule,
    BlockUIModule.forRoot()
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
