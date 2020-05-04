import { Isorter } from './../models/sorter';
import { Icontact, IcontactSummary } from './../models/contact';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError, Observable, BehaviorSubject, Subject, of } from 'rxjs';
import { map, catchError, tap, distinctUntilChanged, switchMap, filter, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  contacts: Observable<Icontact[]>;
  activeSort: Isorter;
  private contactsSubject = new BehaviorSubject<Icontact[]>([])

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

  load(): Observable<Icontact[]> {
    return this.http.get<Icontact[]>('https://raw.githubusercontent.com/santhony7/Angular-Developer-Take-Home-Challenge/master/contacts.json')
      .pipe(
        shareReplay(1),
        tap(res => {
          return this.contactsSubject.next(res.sort((a, b) => {
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


  getSummary(): Observable<IcontactSummary> {
    return this.contacts
      .pipe(
        switchMap(res => {
          const keys = [...new Set(res.map(i => i.contactState))];
          const counts = new Map(keys.map(k => [k, res.filter(i => i.contactState === k).length]));
          const obj = {};
          for (let prop of counts) {
            obj[prop[0]] = prop[1];
          }
          return of({ total: res.length, states: obj } as IcontactSummary);
        }),
        catchError(errors => {
          return observableThrowError(errors);
        })
      );
  }

  sort(sorter: Isorter): Observable<Icontact[]> {
    this.activeSort = sorter;
    return this.load();
  }

}
