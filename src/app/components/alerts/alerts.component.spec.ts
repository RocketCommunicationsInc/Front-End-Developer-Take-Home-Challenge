import {ComponentFixture, TestBed} from "@angular/core/testing";

import {AlertsComponent} from "./alerts.component";
import {DataLoadModule} from "../../modules/data-load/data-load.module";
import {AssetsDataModule} from "../../modules/assets-data/assets-data.module";
import {By} from "@angular/platform-browser";
import {AgGridModule} from "ag-grid-angular";
import {FontAwesomeTestingModule} from "@fortawesome/angular-fontawesome/testing";

describe("AlertsComponent", () => {
  let component: AlertsComponent;
  let fixture: ComponentFixture<AlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AgGridModule.withComponents([]),
        FontAwesomeTestingModule,
        DataLoadModule,
        AssetsDataModule
      ],
      declarations: [AlertsComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should show alert count header", () => {
    fixture.detectChanges();
    const alertCount = fixture.debugElement.query(By.css(".summary-item"));
    expect(alertCount).toBeTruthy();
    expect(alertCount.nativeElement.textContent).toContain("Number of Alerts:");
  });

  it("should show correct headers", () => {
    const headers = fixture.debugElement.queryAll(By.css(".ag-header-cell-text"));
    expect(headers).not.toBeNull();
    expect(headers.map(header => header.nativeElement.textContent)).toEqual(["Message", "Category", "Time"]);
  });
});
