import { TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import {HeaderComponent} from "./components/header/header.component";
import {DataLoadModule} from "./modules/data-load/data-load.module";
import {AssetsDataModule} from "./modules/assets-data/assets-data.module";

describe("AppComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DataLoadModule,
        AssetsDataModule
      ],
      declarations: [
        AppComponent,
        HeaderComponent
      ],
    }).compileComponents();
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
