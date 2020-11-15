import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DataPathsToken} from "../data-load/model/data-paths.service";
import {DataServiceToken} from "../data-load/model/data.service";
import {AssetsDataPathService} from "./service/assets-data-path.service";
import {AssetsDataService} from "./service/assets-data.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    { provide: DataPathsToken, useClass: AssetsDataPathService },
    { provide: DataServiceToken, useClass: AssetsDataService }
  ]
})
export class AssetsDataModule {
}
