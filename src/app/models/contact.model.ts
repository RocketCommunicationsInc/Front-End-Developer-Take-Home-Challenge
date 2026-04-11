
// interface is Typescript's way of defining the shape of an object
// I used interface here instead of class because my Alert and Contact are pure data and does not require methods which is class 

export interface Alert {
    errorId: string;
    errorSeverity: 'critical' | 'serious' | 'caution' | 'normal';
    errorCategory: string;
    errorMessage: string;
    errorTime: number;
    contactRef: string;
    contactName: string;
    contactBeginTimestamp: number;
    contactEndTimestamp: number;
    contactSatellite?: string; // This has a ? means that it is optional because it does not exist on the raw Alert presented in the data.json; I will be adding it later when I process the data in our service.
    contactDetail?: string;
    acknowledged: boolean;
}

export interface Contact {
    contactId: string;
    contactName: string;
    contactStatus: string;
    contactState: string;
    contactSatellite: string;
    contactEquipment: string;
    contactDetail: string;
    contactBeginTimestamp: number;
    contactEndTimestamp: number;
    alerts: Alert[]; // this is an array objects, also means that one Contact can have many Alerts 

}
