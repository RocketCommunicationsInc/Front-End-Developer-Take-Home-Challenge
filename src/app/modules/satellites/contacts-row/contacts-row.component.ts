import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contacts-row',
  templateUrl: './contacts-row.component.html',
})
export class ContactsRowComponent {
  @Input() contact: any;

  constructor() { }
}
