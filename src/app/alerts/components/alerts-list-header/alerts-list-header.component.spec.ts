import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AlertsListHeaderComponent } from '@grmAlerts/components/alerts-list-header/alerts-list-header.component'

describe('AlertsListHeaderComponent', () => {
  let component: AlertsListHeaderComponent
  let fixture: ComponentFixture<AlertsListHeaderComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertsListHeaderComponent ]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsListHeaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
