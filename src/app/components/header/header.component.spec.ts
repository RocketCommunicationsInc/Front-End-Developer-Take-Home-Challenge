import {ComponentFixture, TestBed} from "@angular/core/testing";

import {HeaderComponent} from "./header.component";
import {FontAwesomeTestingModule} from "@fortawesome/angular-fontawesome/testing";
import {AlertButtonComponent} from "../alert-button/alert-button.component";
import {DataLoadModule} from "../../modules/data-load/data-load.module";
import {AssetsDataModule} from "../../modules/assets-data/assets-data.module";

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FontAwesomeTestingModule,
        DataLoadModule,
        AssetsDataModule
      ],
      declarations: [HeaderComponent, AlertButtonComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
