import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Contact } from '../contact';
import { CONTACTS } from './mock-contacts';
import { DebuggerService } from './debugger.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(
    private http: HttpClient,
    private debuggerService: DebuggerService
  ) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private log(message: string) {
    this.debuggerService.add(`ContactService: ${message}`);
  }

  private contactUrl = 'api/contacts'; // URL to web api

  // the catchError() operator intercepts an observable that failed. it passes the error an error handler that can do what it wants with the error
  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactUrl).pipe(
      tap((_) => this.log('fetched Contacts')),
      catchError(this.handleError<Contact[]>('getContacts', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  // GET contact by contactName, its shorter than id
  // returns an observable <Contact> (an obserable of contact objects) rather than an obserable of contact arrays
  getContact(contactName: number): Observable<Contact> {
    const url = `${this.contactUrl}/${contactName}`;
    return this.http.get<Contact>(url).pipe(
      tap((_) => this.log(`fetched contact ${contactName}`)),
      catchError(
        this.handleError<Contact>(`getContact contactName=${contactName}`)
      )
    );
  }

  // PUT: update the hero on the server
  updateContact(contact: Contact): Observable<any> {
    return this.http.put(this.contactUrl, contact, this.httpOptions).pipe(
      tap((_) => this.log(`updated contact: ${contact.contactName}`)),
      catchError(this.handleError<any>('updateContact'))
    );
  }
}
