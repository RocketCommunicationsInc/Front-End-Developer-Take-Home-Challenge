/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ContactListComponent } from './contact-list.component';
import { HttpClientModule } from '@angular/common/http';

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactListComponent ],
      imports: [HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Method: filterList() should filter contacts to the specified status', () => {
    component.contacts = [
      <any>{contactStatus: 'red'},
      {contactStatus: 'blue'}
    ];
    component.filterList('blue');
    expect(component.filteredContacts).toEqual([<any>{contactStatus: 'blue'}]);
  });
});
