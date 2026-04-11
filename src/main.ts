


import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { defineCustomElements } from '@astrouxds/astro-web-components/loader';

defineCustomElements(); // Registers all the Astro components

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
