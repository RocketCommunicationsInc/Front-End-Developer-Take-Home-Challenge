import {ComponentFixture, TestBed} from "@angular/core/testing";

import {AlertButtonComponent} from "./alert-button.component";
import {DataLoadModule} from "../../modules/data-load/data-load.module";
import {AssetsDataModule} from "../../modules/assets-data/assets-data.module";
import {FontAwesomeTestingModule} from "@fortawesome/angular-fontawesome/testing";

describe("AlertButtonComponent", () => {
  let component: AlertButtonComponent;
  let fixture: ComponentFixture<AlertButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FontAwesomeTestingModule,
        DataLoadModule,
        AssetsDataModule
      ],
      declarations: [AlertButtonComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
