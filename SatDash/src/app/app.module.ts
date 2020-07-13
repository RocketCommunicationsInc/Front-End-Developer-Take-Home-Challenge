import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactService } from './contact.service';
import { ContactSearchComponent } from './contact-search/contact-search.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { DebuggerComponent } from './debugger/debugger.component';

// Astro imports
import '../../node_modules/@astrouxds/rux-global-status-bar';
import '../../node_modules/@astrouxds/rux-clock/rux-clock.js';
import '../../node_modules/@astrouxds/rux-status/rux-status.js';
import { AlertComponent } from './alert/alert.component';
import { ContactsCountPipe } from './contacts-count.pipe';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),
  ],
  declarations: [
    AppComponent,
    ContactsComponent,
    ContactDetailComponent,
    DebuggerComponent,
    DashboardComponent,
    ContactSearchComponent,
    AlertComponent,
    ContactsCountPipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ContactService],

  bootstrap: [AppComponent],
})
export class AppModule {}
