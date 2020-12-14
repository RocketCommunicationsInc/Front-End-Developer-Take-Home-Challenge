import { Component, OnInit } from '@angular/core';
import { ContactsService } from 'src/app/core/services/contacts/contacts.service';
import '@astrouxds/rux-status';
import '@astrouxds/rux-static';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  isLoading = false;
  contacts;
  totalContacts;
  totalStates;
  error = '';


  constructor(
    private contactsService: ContactsService
  ) { }

  ngOnInit() {
    this.contactsService.getContacts().subscribe(contacts => {
      this.isLoading = true;

      if(contacts.length > 0) {
        this.contacts = contacts;
        this.totalContacts = contacts.length;
        this.totalStates = this.unique(this.contacts, 'contactState');
      } else {
        this.contacts = null;
      }

      this.isLoading = false;
    },
    err => {
      this.error = err.message;
      this.isLoading = false;
    });
  }

  unique(arr, prop) {
    // Find unique entries for a select property in an array
    return arr.map(function(e) { return e[prop]; }).filter(function(e,i,a){
        return i === a.indexOf(e);
    });
  }

  showDetail(id) {
    // Toggle additional data utilizing a 'hidden' class
    var label = document.getElementById("showHide_" + id);
    var details = document.getElementById(id);
    details.classList.toggle('hidden');

    // Toggle +/- depending on if hidden or shown
    if(label.innerHTML == '+') {
      label.innerHTML = '-';
    } else {
      label.innerHTML = '+'
    }
  }
}
