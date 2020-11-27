import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-status',
  templateUrl: './contact-status.component.html',
  styleUrls: ['./contact-status.component.scss']
})
export class ContactStatusComponent implements OnInit {
  @Input() status: string;
  constructor() { }

  ngOnInit(): void {
  }
}
