import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private httpClient: HttpClient) {}

  getContacts() {
    return this.httpClient.get("../assets/json/contacts.json");
  }
}
