import { Component, inject } from '@angular/core';
import { ContactsService } from './contacts.service';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';

@Component({
  selector: 'app-contacts',
  imports: [
	AstroComponentsModule,
	AsyncPipe,
	DatePipe
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {
	private contactsService = inject(ContactsService);
	currentAlertDialogOpened: boolean = false;
	currentAlertDialog: any = null;
	acknowledgedIds: any[] = [];
	contacts$: Observable<any[]> = this.contactsService.contacts$;
	alertSeverityButtons: any[] = [
		{ label: "Contacts", value: "contacts" },
		{ label: "Alerts", value: "alerts", selected: true },
		{ label: "Critical", value: "critical" },
		{ label: "Serious", value: "serious" },
		{ label: "Warning", value: "warning" },
		{ label: "Caution", value: "caution" }
	];

	constructor(public contacts: ContactsService) {}

	ngOnInit() {
		this.contactsService.filterContacts("alerts");
	}

	openAlertDetails(contact: any) {
		this.currentAlertDialogOpened = true;
		this.currentAlertDialog = contact;
	}

	acknowledgeAlertDetails() {
		this.acknowledgedIds.push(this.currentAlertDialog._id);
		this.currentAlertDialogOpened = false;
		this.currentAlertDialog = null;
	}

	filterAlerts(contact: any) {
		return contact.alerts.filter((alert: any) => {
			return !this.acknowledgedIds.includes(alert._id);
		});
	}

	filterContactsBySeverity(ruxbutton: any ) {
		const errorSeverity = this.alertSeverityButtons.find(a => a.label === ruxbutton.detail).value;
		this.contactsService.filterContacts(errorSeverity);
	}
}
