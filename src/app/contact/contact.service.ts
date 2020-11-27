import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contact } from './contact.model';
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  constructor(
    private http: HttpClient
  ) { }

  fetchAll(): Observable<any>{
    return this.http.get('assets/dummy/contacts.json').pipe(
      map((res: Contact[]) => {
          res = res.sort((a: Contact, b: Contact) => a.contactName > b.contactName ? 1 : -1);
          this.contacts = res;
          return res;
      })
    );
  }

  sortContacts(dir: string): Contact[]{
    if (dir === 'asc'){
       this.contacts.sort((a: Contact, b: Contact) => a.contactName > b.contactName ? 1 : -1);
     } else {
      this.contacts.sort((a: Contact, b: Contact) => a.contactName < b.contactName ? 1 : -1);
     }
    return this.contacts;
  }

}
