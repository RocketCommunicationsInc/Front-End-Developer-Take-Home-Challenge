import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideMockStore } from '@ngrx/store/testing'
import { ContactsListComponent, ContactsListDisplayComponent } from '@grmContacts/components/contacts-list/contacts-list.component'

/**
 * GRM Contacts component tests
 */
describe('ContactsListComponent', () => {
  let component: ContactsListComponent
  let fixture: ComponentFixture<ContactsListComponent>

  const initialState: any = {
    contacts: []
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ContactsListComponent,
        ContactsListDisplayComponent
      ],
      providers: [
        provideMockStore({initialState})
      ]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
