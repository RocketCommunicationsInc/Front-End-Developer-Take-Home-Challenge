import { SubscribeCleaner } from './../../../subscribe-cleaner.component';
import { Observable } from 'rxjs';
import { AlertsService } from './../../../services/alerts.service';
import { Ialert, IalertSummary } from './../../../models/alert';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert-header',
  templateUrl: './alert-header.component.html',
  styleUrls: ['./alert-header.component.scss']
})
export class AlertHeaderComponent extends SubscribeCleaner implements OnInit {

  summary: Observable<IalertSummary>;

  constructor(private alertsService: AlertsService) {
    super();
  }

  ngOnInit() {
    this.summary = this.alertsService.getSummary();
    this.unsubscribeOnDestroy = this.summary.subscribe();
  }



}
