import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactStatusComponent } from './contact-status.component';

describe('ContactStatusComponent', () => {
  let component: ContactStatusComponent;
  let fixture: ComponentFixture<ContactStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
