import { TestBed } from '@angular/core/testing';

import { AlertsService } from './alerts.service';
import { HttpClientModule } from '@angular/common/http';

describe('AlertsService', () => {
  let service: AlertsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ]
    });
    service = TestBed.inject(AlertsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
