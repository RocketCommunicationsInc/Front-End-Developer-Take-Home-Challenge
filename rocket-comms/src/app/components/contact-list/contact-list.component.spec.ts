import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactListComponent } from './contact-list.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AstroComponentsModule} from "@astrouxds/angular";
import {DataService} from "../../services/data.service";
import {CONTACT_STATE} from "../../models/contact-state.enum";

describe('ContactListComponent', () => {

  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        AstroComponentsModule
      ],
      providers: [
        DataService
      ],
      declarations: [ContactListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('transformContactState', (): void => {
    it('should return "Complete" for "complete" input', (): void => {
      const result: string = component.transformContactState({
        contactState: 'complete'
      });
      expect(result).toBe(CONTACT_STATE.COMPLETE);
    });

    it('should return "Executing" for "executing" input', (): void => {
      const result: string = component.transformContactState({
        contactState: 'executing'
      });
      expect(result).toBe(CONTACT_STATE.EXECUTING);
    });

    it('should return "Failed" for "failed" input', (): void => {
      const result: string = component.transformContactState({
        contactState: 'failed'
      });
      expect(result).toBe(CONTACT_STATE.FAILED);
    });

    it('should return "Upcoming" for "upcoming" input', (): void => {
      const result: string = component.transformContactState({
        contactState: 'upcoming'
      });
      expect(result).toBe(CONTACT_STATE.UPCOMING);
    });

    it('should return "N/A" if contactState is an empty string', (): void => {
      const result: string = component.transformContactState({
        contactState: ''
      });
      expect(result).toBe(CONTACT_STATE.NOT_AVAILABLE);
    });

    it('should return the original value for unknown input', (): void => {
      const result: string = component.transformContactState({
        contactState: 'delayed' // An unknown state.
      });
      expect(result).toBe('delayed');
    });

    it('should return undefined if contactState is undefined', (): void => {
      const result: string = component.transformContactState({});
      expect(result).toBeUndefined();
    });
  });
});
