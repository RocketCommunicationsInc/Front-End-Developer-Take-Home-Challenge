import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideMockStore } from '@ngrx/store/testing'
import { AlertsListItemComponent, AlertsListItemDisplayComponent } from '@grmAlerts/components/alerts-list-item/alerts-list-item.component'

/**
 * GRM Alert List Item component tests
 */
describe('AlertsListItemComponent', () => {
  let component: AlertsListItemComponent
  let fixture: ComponentFixture<AlertsListItemComponent>

  const initialState: any = {
    activeAlerts: []
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AlertsListItemComponent,
        AlertsListItemDisplayComponent
      ],
      providers: [
        provideMockStore({initialState})
      ]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsListItemComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
