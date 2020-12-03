import { Component, OnInit } from '@angular/core'
import { AlertsService } from './alerts/alerts.service'
import { ContactsService } from './contacts/contacts.service'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MatSnackBar]
})
export class AppComponent implements OnInit {

  constructor(
    private alertService: AlertsService,
    private contactService: ContactsService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.contactService.onError.subscribe(errorMessage => {
      this.openSnackBar(errorMessage, 'Error')
    })

    this.alertService.onError.subscribe(errorMessage => {
      this.openSnackBar(errorMessage, 'Error')
    })

    this.alertService.getData().subscribe(alerts => {
      localStorage.setItem('alertsData', JSON.stringify(alerts))
    })

    this.contactService.getData().subscribe(contacts => {
      localStorage.setItem('contactsData', JSON.stringify(contacts))
    })
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    })
  }

  // if wanting to destroy the data in the future
  // ngOnDestroy(): void {
  //   localStorage.removeItem('alertsData')
  //   localStorage.removeItem('contactsData')
  //   this.alertService.onError.unsubscribe()
  //   this.contactService.onError.unsubscribe()
  // }
}
