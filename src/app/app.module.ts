import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AstroComponentsModule } from '@astrouxds/angular'
import { AlertListComponent } from './components/alert-list/alert-list.component';
import { AlertDetailComponent } from './components/alert-detail/alert-detail.component';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, AlertListComponent, AlertDetailComponent],
  imports: [BrowserModule, AstroComponentsModule, BrowserModule, FormsModule, RouterOutlet, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
