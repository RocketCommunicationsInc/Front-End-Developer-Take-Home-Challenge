import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ContactsListHeaderComponent } from '@grmContacts/components/contacts-list-header/contacts-list-header.component'

/**
 * GRM Contacts List Header component tests
 */
describe('ContactsListHeaderComponent', () => {
  let component: ContactsListHeaderComponent
  let fixture: ComponentFixture<ContactsListHeaderComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactsListHeaderComponent ]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsListHeaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
