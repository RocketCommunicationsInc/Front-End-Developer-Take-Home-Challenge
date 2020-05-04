import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './containers/header/header.component';
import { FooterComponent } from './containers/footer/footer.component';
import { ToolbarComponent } from './containers/toolbar/toolbar.component';
import { LogoComponent } from './components/logo/logo.component';
import { AlertsComponent } from './containers/alerts/alerts.component';
import { ContactsComponent } from './containers/contacts/contacts.component';
import { ContactHeaderComponent } from './containers/contacts/contact-header/contact-header.component';
import { AlertHeaderComponent } from './containers/alerts/alert-header/alert-header.component';
import { HomeComponent } from './containers/home/home.component';
import { NotFoundComponent } from './containers/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { PanelComponent } from './shared/components/panel/panel.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ToolbarComponent,
    LogoComponent,
    AlertsComponent,
    ContactsComponent,
    ContactHeaderComponent,
    AlertHeaderComponent,
    HomeComponent,
    NotFoundComponent,
    PanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
