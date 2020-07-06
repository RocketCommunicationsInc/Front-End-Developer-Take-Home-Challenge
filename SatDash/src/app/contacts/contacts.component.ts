import { Component, OnInit } from '@angular/core';
import { Contact } from '../../contacts';
import { CONTACTS } from '../mock-contacts';

// this is generated each time you use the ng generate component cli command
@Component({
  selector: 'app-contacts', // components css selector
  templateUrl: './contacts.component.html', // the location of the components template
  styleUrls: ['./contacts.component.scss'], // the location of the components private css styles
})
export class ContactsComponent implements OnInit {
  // this previously was a massive object, but now we're referencing a mock object somewhere else, instead of putting the object itself in our component
  contacts = CONTACTS;

  constructor() {}

  ngOnInit(): void {}
}
