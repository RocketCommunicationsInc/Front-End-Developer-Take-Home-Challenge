/**
 * Interface to represent contacts
 */
export interface Contact {
  /**
   * Unique id
   */
  contactId: string;
  /**
   * Status
   */
  contactStatus: string;
  /**
   * Name
   */
  contactName: number;
  /**
   * Not sure - ground station?
   */
  contactGround: string;
  /**
   * Not sure - satellite number?
   */
  contactSatellite: string;
  /**
   * Equipment
   */
  contactEquipment: string;
  /**
   * State
   */
  contactState: string;
  /**
   * Not sure
   */
  contactStep: string;
  /**
   * Detail
   */
  contactDetail: string;
  /**
   * Timestamp of the start of the contact
   */
  contactBeginTimestamp: number;
  /**
   * Timestamp of the end of the contact
   */
  contactEndTimestamp: number;
  /**
   * Latitude
   */
  contactLatitude: number;
  /**
   * Longitude
   */
  contactLongitude: number;
  /**
   * Azimuth
   */
  contactAzimuth: number;
  /**
   * Elevation
   */
  contactElevation: number;
  /**
   * Not sure
   */
  contactResolution: string;
  /**
   * Not sure
   */
  contactResolutionStatus: string;
}
