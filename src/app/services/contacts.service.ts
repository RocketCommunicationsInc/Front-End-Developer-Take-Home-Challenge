import { environment } from './../../environments/environment';
import { Sorter } from './../models/sorter';
import { Contact, ContactSummary } from './../models/contact';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError, Observable, BehaviorSubject, Subject, of } from 'rxjs';
import { map, catchError, tap, distinctUntilChanged, switchMap, filter, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private _contacts: Contact[];
  contacts: Observable<Contact[]>;
  activeSort: Sorter;
  private contactsSubject = new BehaviorSubject<Contact[]>([])

  constructor(
    private http: HttpClient) {

    this.contacts = this.contactsSubject.asObservable().pipe(
      filter(res => res !== null),
      distinctUntilChanged(),
      map(res => {
        return res;
      })
    );

  }

  load(): Observable<Contact[]> {
    return this.http.get<Contact[]>(environment.contactsApi)
      .pipe(
        shareReplay(1),
        tap(res => {
          return this.contactsSubject.next(res.sort((a, b) => {
            this._contacts = [...res];
            if (!this.activeSort) {
              return 1;
            } else if (this.activeSort.direction === 'ASC') {
              return (a[this.activeSort.property] > b[this.activeSort.property]) ? 1 : -1;
            } else if (this.activeSort.direction === 'DESC')
              return (a[this.activeSort.property] > b[this.activeSort.property]) ? -1 : 1;
          }
          ))
        }),
        catchError(errors => {
          return observableThrowError(errors);
        })
      );
  }

  getSummary(): Observable<ContactSummary> {
    return this.contacts
      .pipe(
        switchMap(res => {
          const keys = [...new Set(res.map(i => i.contactState))];
          const counts = new Map(keys.map(k => [k, res.filter(i => i.contactState === k).length]));
          const obj = {};
          for (let prop of counts) {
            obj[prop[0]] = prop[1];
          }
          return of({ total: res.length, states: obj } as ContactSummary);
        }),
        catchError(errors => {
          return observableThrowError(errors);
        })
      );
  }

  sort(sorter: Sorter): void {
    this.activeSort = { ...sorter };
    return this.contactsSubject.next(this._contacts.sort((a, b) => {
      if (!this.activeSort) {
        return 1;
      } else if (this.activeSort.direction === 'ASC') {
        return (a[this.activeSort.property] > b[this.activeSort.property]) ? 1 : -1;
      } else if (this.activeSort.direction === 'DESC')
        return (a[this.activeSort.property] > b[this.activeSort.property]) ? -1 : 1;
    }
    ))
  }

}
