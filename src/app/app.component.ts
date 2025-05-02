import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AstroComponentsModule } from '@astrouxds/angular';
import { ContactsComponent } from './contacts/contacts.component';

@Component({
  selector: 'app-root',
  imports: [
	RouterOutlet,
	AstroComponentsModule,
	ContactsComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'rocketcomm-challenge';
}
