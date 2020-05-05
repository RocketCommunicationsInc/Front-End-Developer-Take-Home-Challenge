import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsComponent } from './contacts.component';
import { HttpClientModule } from '@angular/common/http';

describe('ContactsComponent', () => {
  let component: ContactsComponent;
  let fixture: ComponentFixture<ContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsComponent ],
      imports: [ HttpClientModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('parse data into array of Contacts', () => {
    const contactsJSON = [
      {
        "_id": "5c926e56fddac523882598d8",
        "contactId": "01bb9a28-7f3a-519c-8b47-0481f946b14a",
        "contactStatus": "normal",
        "contactName": 64900,
        "contactGround": "CTS",
        "contactSatellite": "USA-256",
        "contactEquipment": "ANT62 VAFB1 SFEP215CH1 ECEU6 WS388 USP182",
        "contactState": "executing",
        "contactStep": "Critical Health",
        "contactDetail": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "contactBeginTimestamp": 1563753600,
        "contactEndTimestamp": 1563754620,
        "contactLatitude": 6.62334,
        "contactLongitude": -50.78854,
        "contactAzimuth": 141.771,
        "contactElevation": 62.9,
        "contactResolution": "complete",
        "contactResolutionStatus": "normal"
      }];

      it('object is created with correct fields', () => {
        const parsedContactsData = component.parse(contactsJSON);
        const contact = parsedContactsData[0];

        expect(contact.id).toEqual("5c926e56fddac523882598d8");
        expect(contact.name).toEqual(64900);
        expect(contact.state).toEqual("executing");
        expect(contact.status).toEqual("normal");
        expect(contact.time).toEqual("02:22:33 - 02:22:34");
      });
  });
});
