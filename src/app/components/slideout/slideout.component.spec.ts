import {ComponentFixture, fakeAsync, TestBed, tick} from "@angular/core/testing";

import {FontAwesomeTestingModule} from "@fortawesome/angular-fontawesome/testing";
import {SlideoutComponent} from "./slideout.component";
import {EventService} from "../../service/event.service";
import {By} from "@angular/platform-browser";
import {filter, take} from "rxjs/operators";

describe("SlideoutComponent", () => {
  let component: SlideoutComponent;
  let fixture: ComponentFixture<SlideoutComponent>;
  let eventService: EventService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FontAwesomeTestingModule
      ],
      declarations: [SlideoutComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideoutComponent);
    component = fixture.componentInstance;
    eventService = TestBed.inject(EventService);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should fire correct event on close button", fakeAsync(() => {
    // Pretty sure this is not a good long term pattern for testing that an Observable fires, but it's probably ok here
    // for a button click that results in a single value
    let slideoutVisible = true;
    eventService.getEventObservable().pipe(
      filter(event => event.type === "slideout"),
      take(1)
    ).subscribe(visibleValue => slideoutVisible = visibleValue.data);

    const buttonElement = fixture.debugElement.query(By.css(".interactive"));
    expect(buttonElement).toBeTruthy();
    // Set the event listener up before this fires to make the observable hot
    buttonElement.triggerEventHandler("click", 0);
    tick();
    expect(slideoutVisible).toBeFalse();
  }));
});
