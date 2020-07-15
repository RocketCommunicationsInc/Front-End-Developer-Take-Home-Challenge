import { Injectable, TemplateRef } from '@angular/core';
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
  private contactsUrl = 'api/contacts/'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private debuggerService: DebuggerService
  ) {}

  private log(message: string) {
    this.debuggerService.add(`DebuggerService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getContacts(): Observable<Contact[]> {
    this.debuggerService.add('Alert Service: fetched all contacts');

    return this.http
      .get<Contact[]>(this.contactsUrl)
      .pipe(catchError(this.handleError<Contact[]>('getContacts', [])));
  }

  // replacing with server request getcontact
  // constructs a url with the desired contacts ID
  // server responds with an obserable of contact objects
  getContact(id: number): Observable<Contact> {
    const url = `${this.contactsUrl}/${id}`;
    return this.http.get<Contact>(url).pipe(
      tap((_) => this.log(`fetched contact id=${id}`)),
      catchError(this.handleError<Contact>(`getContact id=${id}`))
    );
  }

  // search contacts where the name matches the search term
  searchContacts(term: number): Observable<Contact[]> {
    if (isNaN(term)) {
      // if not number term, return empty cotact array.
      return of([]);
    }
    return this.http.get<Contact[]>(`${this.contactsUrl}/?name=${term}`).pipe(
      tap((x) =>
        isNaN(term)
          ? this.log(`found contacts matching ${term}`)
          : this.log(`no contacts matching ${term}`)
      ),
      catchError(this.handleError<Contact[]>('searchContacts', []))
    );
  }
}
