import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideMockStore } from '@ngrx/store/testing'
import { AlertsListHeaderComponent,
  AlertsListHeaderDisplayComponent } from '@grmAlerts/components/alerts-list-header/alerts-list-header.component'

/**
 * GRM Alerts List Header component tests
 */
describe('AlertsListHeaderComponent', () => {
  let component: AlertsListHeaderComponent
  let fixture: ComponentFixture<AlertsListHeaderComponent>

  const initialState: any = {
    alerts: [],
    activeAlerts: []
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AlertsListHeaderComponent,
        AlertsListHeaderDisplayComponent
      ],
      providers: [
        provideMockStore({initialState})
      ]
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
