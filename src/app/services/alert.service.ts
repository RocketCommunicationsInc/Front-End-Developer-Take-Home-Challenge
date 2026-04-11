
// HTTPClient was used because it integrated better with Angular because it automatically handles errors and other functionalities. We can also use fetch() APL

import { Injectable } from '@angular/core'; // this tells Angular that this can be injected into other components
import { HttpClient } from '@angular/common/http'; // Built-in tool for making HTTP requests which is used to load data.json
import { BehaviorSubject } from 'rxjs'; // Special object from RxJS that holds value and broadcasts changes to anyone listening
import { Alert, Contact } from '../models/contact.model'; // TypeScript interfaces we created 

@Injectable({ providedIn: 'root' }) // @Injectable is a decorator that tells Angular how to treat this class. providedIn: 'root' means that Angular creates 1 single instance which is shareed across the entire app
export class AlertService {

    private alertsSubject = new BehaviorSubject<Alert[]>([]);
    // alertsSubject is private meaning that only this service can push new values into it

    alerts$ = this.alertsSubject.asObservable();
    // alerts$ is public meaning that components can subscribe to it and receive updates. $ is a convention meaning that it is Observable
    // asObservable strips away the ability to push new values and components can only read, not write

    constructor(private http: HttpClient) {
        this.loadData();
    }

    private loadData(): void {
        this.http.get<Contact[]>('assets/data.json').subscribe(contacts => { // .subscribe is how we receive response from the HTTP requests. It is just saying that whenever the data arrives, run this function
            const allAlerts: Alert[] = [];

            contacts.forEach(contact => {
                contact.alerts.forEach(alerts => {
                    allAlerts.push({
                        ...alerts, // the spread operator which copies all existing alert properties
                        contactSatellite: contact.contactSatellite,
                        contactDetail: contact.contactDetail,
                        acknowledged: false
                    });
                });
            });

            allAlerts.sort((a, b) => b.errorTime - a.errorTime);
            // we could have use Lodash _.orderBy() instead of sort but sort is much cleaner 

            this.alertsSubject.next(allAlerts);
        });
    }

    acknowledgeAlert(errorId: string): void{
        const current = this.alertsSubject.getValue();
        const updated = current.map(alert =>
            alert.errorId === errorId && !alert.acknowledged
            ? { ...alert, acknowledged: true }
            // ? if this is the alert we want AND it is not already acknowledged, return a copy with acknowledged: true. Otherwise return it unchanged

            : alert
        );
        this.alertsSubject.next(updated);
    }
}