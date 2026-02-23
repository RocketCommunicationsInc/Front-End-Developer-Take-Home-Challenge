import { Component, input, output } from '@angular/core';
import { UUIDTypes } from 'uuid';

export interface Alert {
  _id: string;
  contactId: UUIDTypes;
  contactStatus: 'normal' | 'critical' | 'caution' | 'serious' | string;
  contactName: number;
  contactGround: 'CTS' | 'HTS' | 'DGS' | 'GTS' | 'TCS' | 'VTS' | 'NHS' | 'TTS' | string;
  contactSatellite: string;
  contactEquipment: string;
  contactState: 'executing' | 'failed' | string;
  contactStep:
    | 'Critical Health'
    | 'Uplink'
    | 'Lock'
    | 'AOS'
    | 'Downlink'
    | 'SARM'
    | 'Command'
    | 'Configure Operation'
    | 'DCC'
    | 'LOS'
    | string;
  contactDetail: string;
  contactBeginTimestamp: string;
  contactEndTimestamp: string;
  contactLatitude: number;
  contactLongitude: number;
  contactAzimuth: number;
  contactElevation: number;
  contactResolution: 'complete' | 'failed' | 'pass' | 'prepass' | 'scheduled' | string;
  contactResolutionStatus: 'normal' | 'critical' | 'standby' | 'off' | string;
  errorId: UUIDTypes;
  errorSeverity: 'warning' | 'caution' | 'serious' | 'critical' | string;
  errorCategory: 'software' | 'hardware' | 'spacecraft' | string;
  errorMessage: string;
  longMessage: string;
  errorTime: string;
  selected: boolean;
  new: boolean;
  expanded: boolean;
  acknowledged?: boolean;
}

@Component({
  selector: 'app-alert-card',
  standalone: false,
  templateUrl: './alert-card.html',
  styleUrl: './alert-card.sass',
})
export class AlertCard {
  alert = input.required<Alert>();
  index = input.required<number>();

  showDetails = output<number>();

  handleAlertClick() {
    this.showDetails.emit(this.index());
  }
}
