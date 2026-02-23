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
  open = input.required<boolean>();
  alert = input.required<Alert>();
  errorCategoryIcon = '';

  @ViewChild('chartLatLon', { read: ElementRef, static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

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
    const geoJson: Feature = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [this.alert().contactLatitude, this.alert().contactLongitude],
      },
      properties: { name: 'contactPosition' },
    };

    const canvas = this.canvasRef.nativeElement;
    console.log(canvas);
    const width = canvas.width;
    const height = canvas.height;

    console.log(height, width);

    const context = canvas.getContext('2d');
    const path = geoPath(
      geoNaturalEarth1()
        .scale(width / 2 / Math.PI)
        .translate([width / 2, height / 2]),
      context
    );

    if (context) {
      json('/world.json').then((worldGeoJson) => {
        context.beginPath();
        path(worldGeoJson as FeatureCollection); // Fill the paths

        context.fillStyle = '#999';
        context.fill();
        path({ type: 'Sphere' });
        context.strokeStyle = '#69b3a2';
        context.stroke();
        context.closePath();

        context.beginPath();
        // Add stroke
        path(geoJson);
        // context.stroke();
        // context.closePath();

        context.fillStyle = '#f00';
        context.fill();
      });
    }
  }

  acknowledgeAlert = output<void>();

  handleAcknowledge() {
    this.acknowledgeAlert.emit();
    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d');
    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
}
