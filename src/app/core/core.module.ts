import { NgModule, Optional, SkipSelf } from '@angular/core';

import { ApiService } from './api.service';


@NgModule({
  providers: [
    ApiService,
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
