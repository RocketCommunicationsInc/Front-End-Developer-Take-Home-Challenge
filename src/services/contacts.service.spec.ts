import { TestBed } from '@angular/core/testing';

import { ContactsService } from './contacts.service';
import { HttpClientModule } from '@angular/common/http';

describe('ContactsService', () => {
  let service: ContactsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ]
    });
    service = TestBed.inject(ContactsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
