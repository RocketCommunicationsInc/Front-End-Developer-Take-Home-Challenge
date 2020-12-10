import { TestBed } from '@angular/core/testing'
import { AlertsService } from '@grmAlerts/alerts.service'

/**
 * The alerts services tests
 */
describe('AlertsService', () => {
  let service: AlertsService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(AlertsService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
