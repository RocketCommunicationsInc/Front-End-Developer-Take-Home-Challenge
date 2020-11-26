import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(
    private http: HttpClient
  ) { }

  fetchAll(): Observable<any>{
    return this.http.get('assets/dummy/contacts.json');
  }
}
