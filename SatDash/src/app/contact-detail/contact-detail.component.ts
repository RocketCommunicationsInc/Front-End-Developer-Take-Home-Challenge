import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
// location is an angular service for interacting with the browser

import { Contact } from '../../contact';
import { ContactService } from '../contact.service';

// previously, contacts component set the contact for contactDetail. it doesnt do that anymore
// instead, it creates a route in response to a url
// contact detail needs a new way to obtain the contact to display.
@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss'],
})
export class ContactDetailComponent implements OnInit {
  @Input() contact: Contact;

  // ActivatedRoute holds information about the route to this instance of the contactDetailComponent
  // ContactService gets data from the remote server and this component will use it to display the contact
  // location is an angular service for interacting with the browser.
  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getContact();
  }

  // go backward one step in browsers history
  goBack(): void {
    this.location.back();
  }

  getContact(): void {
    const contactName = +this.route.snapshot.paramMap.get('contactName');
    this.contactService
      .getContact(contactName)
      .subscribe((contact) => (this.contact = contact));
  }
}
