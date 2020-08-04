import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsRowComponent } from './contacts-row.component';

describe('ContactsRowComponent', () => {
  let component: ContactsRowComponent;
  let fixture: ComponentFixture<ContactsRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
