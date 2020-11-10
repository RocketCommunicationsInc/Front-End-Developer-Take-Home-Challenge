import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {HeaderComponent} from "./components/header/header.component";
import {FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faSatelliteDish} from "@fortawesome/free-solid-svg-icons";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule
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
