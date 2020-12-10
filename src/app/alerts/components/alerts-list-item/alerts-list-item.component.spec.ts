import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AlertsListItemComponent } from '@grmAlerts/components/alerts-list-item/alerts-list-item.component'

describe('AlertsListItemComponent', () => {
  let component: AlertsListItemComponent
  let fixture: ComponentFixture<AlertsListItemComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertsListItemComponent ]
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
