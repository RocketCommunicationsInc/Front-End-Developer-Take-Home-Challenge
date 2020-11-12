import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {HeaderComponent} from "./components/header/header.component";
import {FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faSatelliteDish} from "@fortawesome/free-solid-svg-icons";
import {AgGridModule} from "ag-grid-angular";
import {ContactsComponent} from "./components/contacts/contacts.component";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsComponent
  ],
  imports: [
    BrowserModule,
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
    library.addIcons(faSatelliteDish);
  }
}
