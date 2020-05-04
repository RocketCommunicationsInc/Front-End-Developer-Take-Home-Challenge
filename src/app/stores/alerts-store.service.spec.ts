import { TestBed } from '@angular/core/testing';

import { AlertsStoreService } from './alerts-store.service';

describe('AlertsStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlertsStoreService = TestBed.get(AlertsStoreService);
    expect(service).toBeTruthy();
  });
});
