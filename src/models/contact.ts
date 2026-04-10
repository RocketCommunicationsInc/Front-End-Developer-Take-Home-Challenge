export interface Contact {
  _id: string;
  contactId: string;
  contactStatus: string;
  contactName: number;
  contactGround: string;
  contactSatellite: string;
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
  alerts?: ContactAlert[];
}

export interface ContactAlert {
  _id?: string;
  acknowledged?: boolean;
  contactId?: string;
  contactName?: number;
  contactTime?: string;
  errorId: string;
  errorSeverity:
    | 'off'
    | 'standby'
    | 'normal'
    | 'caution'
    | 'serious'
    | 'critical';
  errorCategory: string;
  errorMessage: string;
  longMessage: string;
  errorTimestamp?: number;
  errorTime: string;
  selected: boolean;
  new: boolean;
  expanded: boolean;
}

export type ContactDataResponse = {
  contact: Contact;
};
export type ContactsDataResponse = {
  contacts: Contact[];
};
export type ContactAlertsDataResponse = {
  alerts: ContactAlert[];
};
