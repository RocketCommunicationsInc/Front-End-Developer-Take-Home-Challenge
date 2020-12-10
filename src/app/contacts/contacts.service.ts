import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

/**
 * The contacts services
 */
@Injectable()
export class ContactsService {
  constructor(
    private http: HttpClient
  ) { }

  /**
   * Loads the contacts from the json data file
   */
  loadContacts(): Observable<any> {
    return this.http.get('assets/contacts.json')
  }
}
