import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of, take, tap } from 'rxjs';
import { Contact } from '../models/contact.model';
import { Alert } from '../models/alert.model';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

	private contactsSubject = new BehaviorSubject<Contact[]>([]);
	contacts$: Observable<Contact[]> = this.contactsSubject.asObservable();  // expose as observable
	private allContacts: Contact[] = [];
	private filter: string = 'alerts';

	constructor(private http: HttpClient) {}

	private populateAllContacts$(): Observable<Contact[]> {
		if (this.allContacts.length == 0) {
			return this.http.get<Contact[]>('assets/data/data.json')
				.pipe(
					map((data) => {
						return data.map((contact: Contact) => {
							if (contact.alerts.length > 1) {
								// sort alerts by errorTime in descending order
								contact.alerts.sort((a:Alert, b:Alert) => b.errorTime - a.errorTime);
							}
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

	private getContacts$(removeContactsWithoutAlerts: boolean = true): Observable<Contact[]> {
		return this.populateAllContacts$().pipe(
			map((contacts: Contact[]) => {
				if (removeContactsWithoutAlerts) {
					return contacts.filter((contact: Contact) => contact.alerts.length > 0);
				} else {
					return contacts;
				}	
			}),
			take(1) // take only the first emission
		);
	}

	acknowledgeAlert(contactId: String, errorId: String): void {
		const contactIndex = this.allContacts.findIndex(contact => contact.contactId == contactId);
		const alertIndex = this.allContacts[contactIndex].alerts.findIndex(alert => alert.errorId == errorId);
		this.allContacts[contactIndex].alerts[alertIndex].acknowledged = true;
		this.filterContacts(this.filter);
	}

	filterContacts(filter: string = ''): void {
		this.filter = filter;
		this.getContacts$(filter != 'contacts').pipe(
			map((contacts: Contact[]) => {
				if (!filter || filter == 'alerts' || filter == 'contacts') {
					return contacts;
				} else {
					return contacts.filter((contact: Contact) => {
						return contact.alerts.some((alert: Alert) => alert.errorSeverity === filter);
					})
					.map((contact: Contact) => {
						contact.alerts = contact.alerts.filter((alert: Alert) => alert.errorSeverity === filter);
						return contact;
					});
				}
			}),
			take(1) // take only the first emission
		).subscribe((contacts) => this.contactsSubject.next(contacts));
	}
}
