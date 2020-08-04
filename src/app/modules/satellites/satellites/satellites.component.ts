import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-satellites',
  template: `
    <div class="m-8 mb-0 flex lg:flex-row justify-between flex-col">
      <app-contacts class="m-2 lg:m-8 lg:mb-0 lg:mr-5 lg:w-1/2 w-full bg-tertiary-d1"></app-contacts>
      <app-alerts class="m-2 lg:m-8 lg:mb-0 lg:ml-0 lg:w-1/2 w-full bg-tertiary-d1"></app-alerts>
    </div>`,
})
export class SatellitesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
