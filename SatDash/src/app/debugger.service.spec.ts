import { TestBed } from '@angular/core/testing';

import { DebuggerService } from './debugger.service';

describe('DebuggerService', () => {
  let service: DebuggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DebuggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
