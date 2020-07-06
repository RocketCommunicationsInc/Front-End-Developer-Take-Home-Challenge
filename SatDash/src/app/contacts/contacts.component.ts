import { Component, OnInit } from '@angular/core';
import { Contact } from '../../contacts';
import { CONTACTS } from '../mock-contacts';

// this is generated each time you use the ng generate component cli command
@Component({
  selector: 'app-contacts', // components css selector
  templateUrl: './contacts.component.html', // the location of the components template
  styleUrls: ['./contacts.component.scss'], // the location of the components private css styles
})

// always export the component class so you can import it elsewhere, like in the AppModule file
export class ContactsComponent implements OnInit {
  contacts = CONTACTS;

  constructor() {}

  // this is a lifecycle hook, it angular calls it shortly after creating a component.
  // good place for initialization logic
  ngOnInit(): void {}
}
