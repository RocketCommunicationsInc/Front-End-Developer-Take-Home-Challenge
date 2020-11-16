import {ComponentFixture, fakeAsync, flush, TestBed, tick} from "@angular/core/testing";
import { AppComponent } from "./app.component";
import {HeaderComponent} from "./components/header/header.component";
import {DataLoadModule} from "./modules/data-load/data-load.module";
import {FontAwesomeTestingModule} from "@fortawesome/angular-fontawesome/testing";
import {ContactsComponent} from "./components/contacts/contacts.component";
import {AlertsComponent} from "./components/alerts/alerts.component";
import {AlertButtonComponent} from "./components/alert-button/alert-button.component";
import {AgGridModule} from "ag-grid-angular";
import {By} from "@angular/platform-browser";
import {EventService} from "./service/event.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DataPathsToken} from "./modules/data-load/model/data-paths.service";
import {AssetsDataPathService} from "./modules/assets-data/service/assets-data-path.service";
import {DataServiceToken} from "./modules/data-load/model/data.service";
import {SlideoutComponent} from "./components/slideout/slideout.component";
import {of} from "rxjs";

describe("AppComponent", () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let eventService: EventService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FontAwesomeTestingModule,
        AgGridModule.withComponents([]),
        DataLoadModule
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        ContactsComponent,
        AlertsComponent,
        AlertButtonComponent,
        SlideoutComponent
      ],
      providers: [
        { provide: DataPathsToken, useClass: AssetsDataPathService },
        { provide: DataServiceToken, useFactory: () => {
          return {
            getData() {
              return of([]);
            }
          };
        }}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    eventService = TestBed.inject(EventService);
    fixture.detectChanges();
  });

  it("should create the app", () => {
    expect(app).toBeTruthy();
  });

  it("should hide the slideout by default", fakeAsync(() => {
    const slideout = fixture.debugElement.query(By.css(".slideout-container"));
    expect(slideout).toBeNull();
  }));

  it("should show slideout on event", fakeAsync(() => {
    eventService.sendEvent({
      type: "slideout",
      data: true
    });
    tick(200);
    fixture.detectChanges();
    tick(200);
    const slideout = fixture.debugElement.query(By.css(".slideout-container"));
    expect(slideout).not.toBeNull();
    flush();
  }));
});
