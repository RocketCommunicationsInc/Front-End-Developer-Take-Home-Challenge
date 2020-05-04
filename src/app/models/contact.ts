export interface Contact {
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


export interface ContactSummary {
    'total': number;
    'states': ContactSummarySeverities;
}

export interface ContactSummarySeverities {
    'executing': number;
    'failed': number;
}