import { SubscribeCleaner } from './../../subscribe-cleaner.component';
import { Icontact } from './../../models/contact';
import { Observable } from 'rxjs';
import { ContactsService } from './../../services/contacts.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent extends SubscribeCleaner implements OnInit {

  contacts: Observable<Icontact[]>;

  @ViewChild('tbody') tableBody: any;

  constructor(public contactsService: ContactsService) {
    super();
    this.unsubscribeOnDestroy = this.contactsService.load().subscribe();
  }

  ngOnInit() {
    this.contacts = this.contactsService.contacts;
    this.unsubscribeOnDestroy = this.contacts.subscribe();
  }

  sortit(property) {
    this.tableBody.nativeElement.scrollTop = 0
    this.contactsService.sort({ direction: !this.contactsService.activeSort || this.contactsService.activeSort.direction === "ASC" ? "DESC" : "ASC", property: property })
  }

}
