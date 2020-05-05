import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsComponent } from './alerts.component';
import { HttpClientModule } from '@angular/common/http';
import { Alert } from 'src/models/alert';

describe('AlertsComponent', () => {
  let component: AlertsComponent;
  let fixture: ComponentFixture<AlertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertsComponent ],
      imports: [ HttpClientModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('parse data into array of Alerts', () => {
    const alertsJSON = [
      {
        "errorId": "6d76630e-e99f-5615-9bd8-331a0fc4b955",
        "errorSeverity": "caution",
        "errorCategory": "software",
        "errorMessage": "Red FEP 121 - Offline",
        "longMessage": "Red FEP 121 is offline at 18:37:45",
        "errorTime": 1542134265725,
        "selected": false,
        "new": false,
        "expanded": false
      },
      {
        "errorId": "20a96646-abbc-5195-9b20-cff2e99f2ada",
        "errorSeverity": "critical",
        "errorCategory": "spacecraft",
        "errorMessage": "USA-168 - Power degradation",
        "longMessage": "USA-168 suffered power degradation at 18:37:54",
        "errorTime": 1542134274738,
        "selected": false,
        "new": false,
        "expanded": false
      }];

      it('create 2 alert objects', () => {
        const parsedAlertsData = component.parse(alertsJSON);

        expect(parsedAlertsData.length).toEqual(2);
      });

      it('object is created with correct fields', () => {
        const parsedAlertsData = component.parse(alertsJSON);
        const firstAlert = parsedAlertsData[0];

        expect(firstAlert.id).toEqual("6d76630e-e99f-5615-9bd8-331a0fc4b955");
        expect(firstAlert.category).toEqual("software");
        expect(firstAlert.message).toEqual("Red FEP 121 - Offline");
        expect(firstAlert.time).toEqual("18:37:45");
      });
  });
});
