import { Component, signal } from '@angular/core';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import data from '../../public/data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.sass',
})
export class App {
  protected readonly title = signal('loisel-challenge');
  constructor() {
    console.log(data);
  }
}
