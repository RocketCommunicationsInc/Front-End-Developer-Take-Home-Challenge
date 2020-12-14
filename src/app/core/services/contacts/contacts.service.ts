import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
    constructor(private http: HttpClient) {
    }

    getContacts() {
        return this.http.get<any>('assets/json/contacts.json');
    }
}
