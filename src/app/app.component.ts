


import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertTableComponent } from './components/alert-table/alert-table.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, AlertTableComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // This is prompting Angular that it should accept any custom HTML elements without showing errors
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {}
