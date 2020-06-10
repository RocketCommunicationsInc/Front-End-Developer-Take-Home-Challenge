import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']

})
export class DashboardComponent implements OnInit {

  constructor(

  ) { }

  ngOnInit(): void {
    
  }

  onSetTheme(theme) {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('light-theme', 'dark-theme');
    body.classList.add(theme);
  }


}
