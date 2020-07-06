import { Component, OnInit } from '@angular/core';

// this is generated each time you use the ng generate component cli command
@Component({
  selector: 'app-contacts', // components css selector
  templateUrl: './contacts.component.html', // the location of the components template
  styleUrls: ['./contacts.component.scss'], // the location of the components private css styles
})

// always export the component class so you can import it elsewhere, like in the AppModule file
export class ContactsComponent implements OnInit {
  constructor() {}
  contact = '5c926e56fddac523882598d8';

  // this is a lifecycle hook, it angular calls it shortly after creating a component.
  // good place for initialization logic
  ngOnInit(): void {}
}
