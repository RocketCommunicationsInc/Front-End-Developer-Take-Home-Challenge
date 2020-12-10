import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { AppModule } from './app/app.module'
import { environment } from './environments/environment'

if (environment.production) {
  enableProdMode()
} else {
  console.log('%cRocket Communications Angular Developer Take-Home Challenge\n---\n' +
    'Author: Scott Carnett\nStack: Angular, NGRX, Astro',
    'color: green; font-size: 14px; font-weight: bold; display: block;')
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err))
