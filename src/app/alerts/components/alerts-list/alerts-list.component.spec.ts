import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideMockStore } from '@ngrx/store/testing'
import { AlertsListComponent, AlertsListDisplayComponent } from '@grmAlerts/components/alerts-list/alerts-list.component'

/**
 * GRM Alerts component tests
 */
describe('AlertsListComponent', () => {
  let component: AlertsListComponent
  let fixture: ComponentFixture<AlertsListComponent>

  const initialState: any = {
    alerts: [],
    activeAlerts: []
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AlertsListComponent,
        AlertsListDisplayComponent
      ],
      providers: [
        provideMockStore({initialState})
      ]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
