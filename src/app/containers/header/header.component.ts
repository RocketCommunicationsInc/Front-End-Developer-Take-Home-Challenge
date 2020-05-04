import { Component, OnInit } from '@angular/core';
import '@astrouxds/rux-clock/rux-clock';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  dateTime = new Date();

  constructor() { }

  ngOnInit() {
  }

}
