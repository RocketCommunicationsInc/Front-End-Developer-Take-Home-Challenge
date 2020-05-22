import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.styl']
})
// title component for page titles
export class TitleComponent implements OnInit {
  @Input() value: string;
  title: string;
  constructor() { }

  ngOnInit(): void {
    this.title = this.value;
  }

}
