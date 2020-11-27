
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  itemsPerPage = 10;
  currentContactPage = 1;
  constructor() {
  }

  updateContactsPage(page: any): void{
    this.currentContactPage = page;
  }
}
