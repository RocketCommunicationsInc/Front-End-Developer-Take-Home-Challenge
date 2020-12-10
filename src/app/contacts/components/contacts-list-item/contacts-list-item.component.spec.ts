import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideMockStore } from '@ngrx/store/testing'
import { ContactsListItemComponent } from '@grmContacts/components/contacts-list-item/contacts-list-item.component'

/**
 * GRM Contact List Item component tests
 */
describe('ContactsListItemComponent', () => {
  let component: ContactsListItemComponent
  let fixture: ComponentFixture<ContactsListItemComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ContactsListItemComponent
      ],
      providers: [
        provideMockStore({})
      ]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsListItemComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
