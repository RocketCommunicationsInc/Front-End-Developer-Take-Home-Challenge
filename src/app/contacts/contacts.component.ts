import { Component, inject } from '@angular/core';
import { ContactsService } from './contacts.service';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { Contact } from '../models/contact.model';
import { Alert } from '../models/alert.model';

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
	private currentAlertErrorId: string = '';
	currentAlertDialogOpened: boolean = false;
	currentAlertDialog: Contact | null = null;
	contacts$: Observable<Contact[]> = this.contactsService.contacts$;
	alertSeverityButtons: {label:string,value:string,selected?:boolean}[] = [
		{ label: "All Contacts", value: "contacts" },
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

	openAlertDetails(contact: Contact, alert: Alert) {
		this.currentAlertDialogOpened = true;
		this.currentAlertDialog = contact;
		this.currentAlertErrorId = alert.errorId;
	}

	acknowledgeAlertDetails() {
		this.contactsService.acknowledgeAlert(this.currentAlertDialog!.contactId, this.currentAlertErrorId);
		this.currentAlertDialogOpened = false;
		this.currentAlertDialog = null;
	}

	indicateWithColor(errorSeverity: string) {
		switch (errorSeverity) {
			case 'critical':
				return 'darkred';
			case 'serious':
				return 'red';
			case 'warning':
				return 'orange';
			case 'caution':
				return 'yellow';
			default:
				return 'gray';
		}
	}

	filterContactsBySeverity(ruxbuttonEvent: {detail: string}) {
		const errorSeverity = this.alertSeverityButtons.find(a => a.label === ruxbuttonEvent.detail)?.value;
		this.contactsService.filterContacts(errorSeverity);
	}
}
