import { IcontactSummary } from './../../../models/contact';
import { Observable } from 'rxjs';
import { SubscribeCleaner } from './../../../subscribe-cleaner.component';
import { ContactsService } from './../../../services/contacts.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-header',
  templateUrl: './contact-header.component.html',
  styleUrls: ['./contact-header.component.scss']
})
export class ContactHeaderComponent extends SubscribeCleaner implements OnInit {

  summary: Observable<IcontactSummary>;

  constructor(private contactService: ContactsService) {
    super();
  }

  ngOnInit() {
    this.summary = this.contactService.getSummary();
    this.unsubscribeOnDestroy = this.summary.subscribe();
  }

}
