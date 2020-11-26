import { Component, OnInit, ViewChild } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-map',
  templateUrl: './contact-map.component.html',
  styleUrls: ['./contact-map.component.scss']
})
export class ContactMapComponent implements OnInit {
  @ViewChild('gMap', {static: true}) gMap: any;
  currentPage = 1;
  options: google.maps.MapOptions = {
    center: {lat: 39.5, lng: -98.35},
    zoom: 1,
    disableDefaultUI: true
  };

  markers: any[] = [];

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

    this._contactService.fetchAll().subscribe((res: Contact[]) => {
      res.forEach((contact: Contact) => {
        const markerObj = {
          position: {lat: contact.contactLatitude, lng: contact.contactLongitude},
          options: {
            icon: 'assets/images/satellite-24.png',
          }
        };
        this.markers.push(markerObj);
      });
    });
  }

}
