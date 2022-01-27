export interface Store {
  alerts: ModifiedAlert[]
}

export interface Contact {
  _id: string,
  contactId: string,
  contactStatus: string,
  contactName: number,
  contactGround: string,
  contactSatellite: string,
  contactEquipment: string,
  contactState: string,
  contactStep: string,
  contactDetail: string,
  contactBeginTimestamp: number,
  contactEndTimestamp: number,
  contactLatitude: number,
  contactLongitude: number,
  contactAzimuth: number,
  contactElevation: number,
  contactResolution: string,
  contaactResolutionStatus: string,
  alerts: Alert[]
}

export interface Alert {
  errorId: string,
  errorSeverity: ErrorSeverity,
  errorCategory: string,
  errorMessage: string,
  longMessage: string,
  errorTime: number,
  selected: boolean,
  new: boolean,
  expanded: boolean,
}

export interface ModifiedAlert {
  acknowledged: boolean,
  contactName: number,
  contactTime: Date,
  contactSatellite: string,
  contactDetail: string,
  errorSeverity: ErrorSeverity,
  errorMessage: string,
  errorTime: number,
  _id: string,
  errorId: string
}

export interface Actions {
  fetchContacts: () => void;
}

export enum ErrorSeverity {
  critical = 'critical', 
  serious = 'serious',
  caution = 'caution',
  undefined = 'undefined'
}