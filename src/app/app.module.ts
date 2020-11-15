import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {HeaderComponent} from "./components/header/header.component";
import {FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faBell, faSatelliteDish, faTimes} from "@fortawesome/free-solid-svg-icons";
import {AgGridModule} from "ag-grid-angular";
import {ContactsComponent} from "./components/contacts/contacts.component";
import {HttpClientModule} from "@angular/common/http";
import {AlertsComponent} from "./components/alerts/alerts.component";
import {AlertButtonComponent} from "./components/alert-button/alert-button.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsComponent,
    AlertsComponent,
    AlertButtonComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule,
    AgGridModule.withComponents([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIcons(faSatelliteDish, faBell, faTimes);
  }
}
