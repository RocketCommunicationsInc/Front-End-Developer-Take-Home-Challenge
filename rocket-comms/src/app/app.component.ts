import { Component } from '@angular/core';
import {DataService} from "./services/data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public title = 'rocket-comms';

  /**
   * Test data used to hydrate the dashboard.
   */
  public data: any = null;

  constructor(private dataService: DataService) {
    // No-op.
  }

  /**
   * Loads the data into the dashboard.
   */
  public loadData(): void {
    if (this.data === null) {

      // NOTE: There is no need to unsubscribe here as our service emits a single value
      // and then completes automatically.
      this.dataService.getData().pipe().subscribe({
        next: (response) => this.data = response,
        error: (err) => console.error('Error loading data:', err)
      });
    }
  }

  public clearData(): void {
    this.data = null;
  }
}
