import { Component, OnInit } from '@angular/core';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
import '@astrouxds/rux-status';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})

export class AlertsComponent implements OnInit {
  isLoading = false;
  alerts;
  totalAlerts;
  error = '';

  constructor(
    private alertsService: AlertsService
  ) { }

  ngOnInit() {
    this.alertsService.getAlerts().subscribe(alerts => {
      this.isLoading = true;

      if(alerts.length > 0) {
        this.alerts = alerts;
        this.totalAlerts = this.alerts.length;
      } else {
        this.alerts = null;
      }

      this.isLoading = false;
    },
    err => {
      this.error = err.message;
      this.isLoading = false;
    });
  }

  showDetail(id) {
    // Toggle additional data utilizing a 'hidden' class
    var label = document.getElementById("showHide_" + id);
    var details = document.getElementById(id);
    details.classList.toggle('hidden');

    // Toggle +/- depending on if hidden or shown
    if(label.innerHTML == '+') {
      label.innerHTML = '-';
    } else {
      label.innerHTML = '+'
    }
  }
}
