import {TestBed} from "@angular/core/testing";

import {AlertsService} from "./alerts.service";
import {DataLoadModule} from "../modules/data-load/data-load.module";
import {AssetsDataModule} from "../modules/assets-data/assets-data.module";

describe("AlertsService", () => {
  let service: AlertsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DataLoadModule,
        AssetsDataModule
      ]
    });
    service = TestBed.inject(AlertsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
