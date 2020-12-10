import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable()
export class ContactsService {
  constructor(
    private http: HttpClient
  ) { }

  loadContacts(): Observable<any> {
    return this.http.get('assets/contacts.json')
  }
}
