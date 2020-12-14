import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import '@astrouxds/rux-tabs';
import '@astrouxds/rux-global-status-bar';
import '@astrouxds/rux-clock';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  activeTab = this.route.snapshot.params['tab'];

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if(this.activeTab != null && this.activeTab != undefined && this.activeTab != '') {
      var tabSelect = document.getElementById(this.activeTab) as HTMLInputElement;
      tabSelect.click();
    }
  }

}
