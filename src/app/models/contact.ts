export interface Icontact {
    "_id": string,
    "contactId": string,
    "contactStatus": string,
    "contactName": number,
    "contactGround": string,
    "contactSatellite": string,
    "contactEquipment": string,
    "contactState": string,
    "contactStep": string,
    "contactDetail": string,
    "contactBeginTimestamp": number,
    "contactEndTimestamp": number,
    "contactLatitude": number,
    "contactLongitude": number,
    "contactAzimuth": number,
    "contactElevation": number,
    "contactResolution": string,
    "contactResolutionStatus": string
}


export interface IcontactSummary {
    'total': number;
    'states': IcontactSummarySeverities;
}

export interface IcontactSummarySeverities {
    'executing': number;
    'failed': number;
}