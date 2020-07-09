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

  getContacts(): Observable<Contact[]> {
    // return of(CONTACTS);
    return this.http.get<Contact[]>(this.contactsUrl);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //todo send error log to logging infastructure
      console.log(error);
      //todo  find better way of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      //todo Keep the app running by returning an empty result
      return of(result as T);
    };
  }

  // replacing with server request getcontact
  getContact(contactName: number): Observable<Contact> {
    const url = `${this.contactsUrl}/${contactName}`;
    return this.http.get<Contact>(url).pipe(
      tap((_) => this.log(`fetched contact contactName=${contactName}`)),
      catchError(
        this.handleError<Contact>(`getContact contactName=${contactName}`)
      )
    );
  }

  // GET heroes whos name contains a search term
  // searchContacts(term: string)

  // getContact(contactName: number) Observable<Contact> {
  //   const url = `${this.contactsUrl}/${contactName}`;
  //   return this.http.get<Contact>(url).pipe(
  //     tap(_ => this.log(`fetched specific contact ${contactName}`)),
  //     catchError(this.handleError<Contact>(`getContact contactName=${contactName}`))
  //   )

  // }
}
