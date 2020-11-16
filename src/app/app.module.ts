import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {HeaderComponent} from "./components/header/header.component";
import {FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faBell, faSatelliteDish, faTimes} from "@fortawesome/free-solid-svg-icons";
import {AgGridModule} from "ag-grid-angular";
import {ContactsComponent} from "./components/contacts/contacts.component";
import {AlertsComponent} from "./components/alerts/alerts.component";
import {AlertButtonComponent} from "./components/alert-button/alert-button.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AssetsDataModule} from "./modules/assets-data/assets-data.module";
import {DataLoadModule} from "./modules/data-load/data-load.module";
import {SlideoutComponent} from "./components/slideout/slideout.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsComponent,
    AlertsComponent,
    AlertButtonComponent,
    SlideoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    AgGridModule.withComponents([]),
    DataLoadModule,
    AssetsDataModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIcons(faSatelliteDish, faBell, faTimes);
  }
}
