import { Component, ElementRef, input, output, ViewChild } from '@angular/core';
import { Alert } from '../alert/alert-card';
import { geoNaturalEarth1, geoPath, json } from 'd3';
import { Feature, FeatureCollection } from 'geojson';

@Component({
  selector: 'app-contact-details',
  standalone: false,
  templateUrl: './contact-details.html',
  styleUrl: './contact-details.sass',
})
export class ContactDetails {
  @ViewChild('chartLatLon', { read: ElementRef, static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  open = input.required<boolean>();
  alert = input.required<Alert>();

  acknowledgeAlert = output<void>();

  errorCategoryIcon = '';

  ngOnInit() {
    switch (this.alert().errorCategory) {
      case 'satellite':
        this.errorCategoryIcon = 'satellite-transmit';
        break;
      case 'software':
        this.errorCategoryIcon = 'sim-card';
        break;
      case 'hardware':
        this.errorCategoryIcon = 'build';
        break;
      default:
        this.errorCategoryIcon = 'error';
    }
    this.errorCategoryIcon;
  }

  async ngOnChanges() {
    const contactPosition: Feature = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [this.alert().contactLatitude, this.alert().contactLongitude],
      },
      properties: { name: 'contactPosition' },
    };

    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d');

    let contactPosColor: string;
    switch (this.alert().errorSeverity) {
      case 'critical':
        contactPosColor = '#ff3838';
        break;
      case 'serious':
        contactPosColor = '#ffb302';
        break;
      case 'caution':
        contactPosColor = '#fce83a';
        break;
      default:
        contactPosColor = '#56f000';
    }

    if (context) {
      const path = geoPath(
        geoNaturalEarth1()
          .scale(canvas.width / 2 / Math.PI)
          .translate([canvas.width / 2, canvas.height / 2]),
        context
      );

      json('/world.json').then((worldGeoJson) => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();

        path(worldGeoJson as FeatureCollection);
        context.fillStyle = '#1c3851';
        context.fill();

        path({ type: 'Sphere' });
        context.strokeStyle = '#4dacff';
        context.stroke();

        context.closePath();

        context.beginPath();
        path(contactPosition);
        context.fillStyle = contactPosColor;
        context.fill();
        context.closePath();
      });
    }
  }

  handleAcknowledge() {
    this.acknowledgeAlert.emit();
  }
}
