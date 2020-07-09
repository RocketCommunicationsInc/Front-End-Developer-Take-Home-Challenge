import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DebuggerComponent } from './debugger/debugger.component';

import { AppRoutingModule } from './app-routing.module';
import { ContactSearchComponent } from './contact-search/contact-search.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    ContactDetailComponent,
    DebuggerComponent,
    DashboardComponent,
    ContactSearchComponent,
  ],

  // httpClientInMemoryWebApiModule intercepts Http requests and returns simulated server responses.
  //  I can remove it when a real server is ready to receive requests

  imports: [BrowserModule, FormsModule, AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
