import { Component, OnInit } from '@angular/core';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
import { ContactsService } from 'src/app/core/services/contacts/contacts.service';
import * as CanvasJS from 'src/assets/canvasjs.min';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  alertPoints = [];
  contactPoints = [];
  themeColors = {
    critical: 'rgb(255, 56, 56)',
    serious: 'rgb(255, 179, 0)',
    caution: 'rgb(252, 232, 58)',
    normal: 'rgb(86, 240, 0)',
    standby: 'rgb(45, 204, 255)',
    off: 'rgb(158, 167, 173)'
  }

  constructor(
    private alertsService: AlertsService,
    private contactsService: ContactsService
  ) { }

  ngOnInit() {
    this.alertsService.getAlerts().subscribe(alerts => {
      var alertLabels = this.unique(alerts, 'errorSeverity');

      if(alertLabels.length > 0) {
        for(var x = 0; x < alertLabels.length; x++) {
          // Filter specific entries with specific Severity
          var data = alerts.filter(function(obj) {
            return obj.errorSeverity == alertLabels[x];
          });

          this.alertPoints.push({y: data.length, label: alertLabels[x], color: this.themeColors[alertLabels[x]]});
        }

        this.createChart("alertChart", "Alerts Severity Breakdown", this.alertPoints);
      }
    },
    err => {
      console.log(err.message);
    });

    this.contactsService.getContacts().subscribe(contacts => {
      var contactLabels = this.unique(contacts, 'contactStatus');

      if(contactLabels.length > 0) {
        for(var x = 0; x < contactLabels.length; x++) {
          // Filter specific entries with specific Status
          var data = contacts.filter(function(obj) {
            return obj.contactStatus == contactLabels[x];
          });

          this.contactPoints.push({y: data.length, label: contactLabels[x], color: this.themeColors[contactLabels[x]]});
        }

        this.createChart("contactChart", "Contact Status Breakdown", this.contactPoints);
      }
    },
    err => {
      console.log(err.message);
    });
  }

  createChart(id, title, data) {
    let chart = new CanvasJS.Chart(id, {
      theme: "dark2",
      animationEnabled: true,
      exportEnabled: false,
      title: {
        text: title
      },
      data: [{
        type: "doughnut",
        startAngle: 60,
        indexLabel: "{label} - #percent%",
        toolTipContent: "<b>{label}:</b> {y} (#percent%)",
        dataPoints: data
      }]
    });
      
    chart.render();
  }

  unique(arr, prop) {
    // Find unique entries for a select property in an array
    return arr.map(function(e) { return e[prop]; }).filter(function(e,i,a){
        return i === a.indexOf(e);
    });
  }
}
