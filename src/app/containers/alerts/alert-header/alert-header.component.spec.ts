import { AlertsService } from './../../../services/alerts.service';
import { PanelComponent } from './../../../shared/components/panel/panel.component';
import { AlertSummary } from './../../../models/alert';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AlertHeaderComponent } from './alert-header.component';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

class AlertsServiceStub {
  getSummary() { return of({ total: 22, severities: { off: 5, normal: 5, caution: 5, serious: 5, critical: 10 } } as AlertSummary) };
}

describe('AlertHeaderComponent', () => {
  let component: AlertHeaderComponent;
  let fixture: ComponentFixture<AlertHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlertHeaderComponent],
      providers: [
        { provide: AlertsService, useClass: AlertsServiceStub }
      ]
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

  it('should display Active Alerts counter', fakeAsync(() => {
    fixture.detectChanges();
    let de = fixture.debugElement.query(By.css('.summary__total-count'));
    expect(de).not.toBeNull();
    expect(de.nativeElement.innerHTML).toEqual('22');

  }));

it('should display 5 status counters', fakeAsync(() => {
    fixture.detectChanges();
    let de = fixture.debugElement.queryAll(By.css('.summary__severity > div'));
    expect(de.length).toBe(5);
  }));

  it('should display Critical counter', fakeAsync(() => {
    fixture.detectChanges();
    let de = fixture.debugElement.query(By.css('.status--critical'));
    expect(de).not.toBeNull();
    let counter = fixture.debugElement.query(By.css('.status--critical~span~span'));
    expect(counter.nativeElement.innerHTML).toEqual('10');
  }));
});
