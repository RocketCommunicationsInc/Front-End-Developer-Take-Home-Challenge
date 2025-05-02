import {Alert} from "./alert.model";

/**
 * An interface for Contact data.
 */
export interface Contact {
  _id: string; // An internal ID of sorts.
  contactId: string;
  contactStatus: string;
  contactName: number;
  contactGround: string;
  contactSatellite: string; // Aka "Iron".
  contactEquipment: string;
  contactState: string;
  contactStep: string;
  contactDetail: string;
  contactBeginTimestamp: number;
  contactEndTimestamp: number;
  contactLatitude: number;
  contactLongitude: number;
  contactAzimuth: number;
  contactElevation: number;
  contactResolution: string;
  contactResolutionStatus: string;
  alerts: Array<Alert>;
}
