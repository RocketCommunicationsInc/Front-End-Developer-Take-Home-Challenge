import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Contact } from '../../contact';
import { ContactService } from '../contact.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss'],
})
export class ContactDetailComponent implements OnInit {
  @Input() contact: Contact;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getContact();
  }

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
