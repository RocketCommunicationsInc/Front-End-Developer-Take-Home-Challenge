import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { mapStyles } from './map-styles';

@Component({
  selector: 'app-contact-map',
  templateUrl: './contact-map.component.html',
  styleUrls: ['./contact-map.component.scss']
})
export class ContactMapComponent implements OnInit{
  @Input() itemsPerPage: any;
  @Input() currentPage: any;
  @Output() selectedContact = new EventEmitter();

  @ViewChild('gMap', {static: true}) gMap: any;
  options: google.maps.MapOptions = {
    center: {lat: 39.5, lng: -98.35},
    zoom: 2,
    disableDefaultUI: true,
    styles: mapStyles
  };

  markers: any[] = [];

  statusRef = {
    off: '#9ea7ac',
    standby: '#2fccff',
    normal: '#57f000',
    caution: '#fce93a',
    serious: '#ffb300',
    critical: '#ff3938',
  };

  constructor(
    private _contactService: ContactService
  ) { }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.options.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });

    this._contactService.fetchAll().subscribe((res: Contact[]) => this.populateMarkers(res));
    this._contactService.contactsUpdated.subscribe((res: Contact[]) => this.populateMarkers(res));
  }

  onMarkerClick(label: { text: string }): void{
    this.selectedContact.emit(parseInt(label.text, 10));
  }

  populateMarkers(contacts: Contact[]): void {

    this.markers = [];
    contacts.forEach((contact: Contact) => {

      const markerObj = {
            position: {lat: contact.contactLatitude, lng: contact.contactLongitude},
            label: {
              text: contact.contactName.toString(),
              color: this.statusRef[contact.contactStatus]
            },
            options: {
              icon: {
                url: `assets/images/satellite-${contact.contactStatus}.png`,
                labelOrigin: { x: 12, y: 35},
              },
            },
          };
      this.markers.push(markerObj);
    });
  }
}
