import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertHeaderComponent } from './alert-header.component';

describe('AlertHeaderComponent', () => {
  let component: AlertHeaderComponent;
  let fixture: ComponentFixture<AlertHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
