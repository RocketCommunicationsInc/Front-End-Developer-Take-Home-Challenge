interface Contact {
    _id: string,
    contactId: string,
    contactStatus: string,
    contactName: 17354,
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
    contactResolution: "complete" | "scheduled" | "failed",
    contactResolutionStatus: "normal" | "off" | "critical"
    contactDuration?: number;
    details?: string,
}
