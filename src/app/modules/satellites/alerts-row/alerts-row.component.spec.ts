import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsRowComponent } from './alerts-row.component';

describe('AlertsRowComponent', () => {
  let component: AlertsRowComponent;
  let fixture: ComponentFixture<AlertsRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertsRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
