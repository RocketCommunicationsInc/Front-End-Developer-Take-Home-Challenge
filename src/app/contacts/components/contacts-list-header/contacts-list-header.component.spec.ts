import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideMockStore } from '@ngrx/store/testing'
import { ContactsListHeaderComponent,
  ContactsListHeaderDisplayComponent } from '@grmContacts/components/contacts-list-header/contacts-list-header.component'

/**
 * GRM Contacts List Header component tests
 */
describe('ContactsListHeaderComponent', () => {
  let component: ContactsListHeaderComponent
  let fixture: ComponentFixture<ContactsListHeaderComponent>

  const initialState: any = {
    contacts: [],
    activeContacts: []
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ContactsListHeaderComponent,
        ContactsListHeaderDisplayComponent
      ],
      providers: [
        provideMockStore({initialState})
      ]
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
