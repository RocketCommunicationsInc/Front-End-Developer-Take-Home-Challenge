export interface Alert {
  contactName: number;
  contactBeginTimestamp: number;
  contactEndTimestamp: number;
  contactSatellite: string;
  contactDetail: string;
  errorId: string;
  errorSeverity: string;
  errorCategory: string;
  errorMessage: string;
  longMessage: string;
  errorTime: number;
  selected: boolean;
  new: boolean;
  expanded: boolean;
}
