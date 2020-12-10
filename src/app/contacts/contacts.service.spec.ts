import { HttpClientModule } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'
import { ContactsService } from '@grmContacts/contacts.service'

/**
 * The contacts services tests
 */
describe('ContactsService', () => {
  let service: ContactsService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        ContactsService
      ]
    })

    service = TestBed.inject(ContactsService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
