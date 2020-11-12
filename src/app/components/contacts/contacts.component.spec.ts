import {ComponentFixture, TestBed} from "@angular/core/testing";

import {ContactsComponent} from "./contacts.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe("ContactsComponent", () => {
  let component: ContactsComponent;
  let fixture: ComponentFixture<ContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ContactsComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
