import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contact } from './contact.model';
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  contactsUpdated: Subject<Contact[]> = new Subject();
  constructor(
    private http: HttpClient
  ) { }

  fetchAll(): Observable<any>{
    if (!this.contacts.length){
      return this.http.get('assets/dummy/contacts.json').pipe(
        map((res: Contact[]) => {
            res = res.sort((a: Contact, b: Contact) => a.contactName > b.contactName ? 1 : -1);
            this.contacts = res;
            return res;
        })
      );
    } else {
      return of(this.contacts);
    }
  }

  sortContacts(dir: string): Contact[]{
    if (dir === 'asc'){
       this.contacts.sort((a: Contact, b: Contact) => a.contactName > b.contactName ? 1 : -1);
     } else {
       this.contacts.sort((a: Contact, b: Contact) => a.contactName < b.contactName ? 1 : -1);
     }
    this.contactsUpdated.next(this.contacts);
    return this.contacts;
  }

}
