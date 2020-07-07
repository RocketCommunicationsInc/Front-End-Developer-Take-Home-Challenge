import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../../contact';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss'],
})
export class ContactDetailComponent implements OnInit {
  @Input() contact: Contact;

  constructor() {}

  ngOnInit(): void {}
}
