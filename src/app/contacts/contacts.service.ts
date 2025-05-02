import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

	private contactsSubject = new BehaviorSubject<any>([]);
	contacts$: Observable<any> = this.contactsSubject.asObservable();  // expose as observable
	private allContacts: any[] = [];

	constructor(private http: HttpClient) {}

	private populateAllContacts$(): Observable<any[]> {
		if (this.allContacts.length == 0) {
			return this.http.get<any>('assets/data/data.json')
				.pipe(
					map((data) => {
						return data.map((contact: any) => {
							// sort alerts by errorTime in descending order
							contact.alerts.sort((a:any, b:any) => b.errorTime - a.errorTime);
							return contact;
						});
					}),
					tap((data) => this.allContacts = data ),
					take(1)
				);
		} else {
			return of(this.allContacts);
		}
	}

	private getContacts$(removeContactsWithoutAlerts: boolean = true): Observable<any[]> {
		return this.populateAllContacts$().pipe(
			map((contacts: any) => {
				if (removeContactsWithoutAlerts) {
					return contacts.filter((contact: any) => contact.alerts.length > 0);
				} else {
					return contacts;
				}	
			}),
			take(1) // take only the first emission
		);
	}

	filterContacts(errorSeverity: string = ''): void {
		this.getContacts$(errorSeverity != 'contacts').pipe(
			map((contacts: any) => {
				if (!errorSeverity || errorSeverity == 'alerts' || errorSeverity == 'contacts') {
					return contacts;
				} else {
					return contacts.filter((contact: any) => {
						return contact.alerts.some((alert: any) => alert.errorSeverity === errorSeverity);
					})
					.map((contact: any) => {
						contact.alerts = contact.alerts.filter((alert: any) => alert.errorSeverity === errorSeverity);
						return contact;
					});
				}
			}),
			take(1) // take only the first emission
		).subscribe((contacts) => this.contactsSubject.next(contacts));
	}
}
