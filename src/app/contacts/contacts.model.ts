export class Contact {
  id: string
  contactId: string
  contactStatus: string
  contactName: number
  contactGround: string
  contactSatellite: string
  contactEquipment: string
  contactState: string
  contactStep: string
  contactDetail: string
  contactBeginTimestamp: number
  contactEndTimestamp: number
  contactLatitude: number
  contactLongitude: number
  contactAzimuth: number
  contactElevation: number
  contactResolution: string
  contactResolutionStatus: string

  constructor(
    id: string,
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
    contactResolutionStatus: string,
  ) {
    this.id = id
    this.contactId = contactId
    this.contactStatus = contactStatus
    this.contactName = contactName
    this.contactGround = contactGround
    this.contactSatellite = contactSatellite
    this.contactEquipment = contactEquipment
    this.contactState = contactState
    this.contactStep = contactStep
    this.contactDetail = contactDetail
    this.contactBeginTimestamp = contactBeginTimestamp
    this.contactEndTimestamp = contactEndTimestamp
    this.contactLatitude = contactLatitude
    this.contactLongitude = contactLongitude
    this.contactAzimuth = contactAzimuth
    this.contactElevation = contactElevation
    this.contactResolution = contactResolution
    this.contactResolutionStatus = contactResolutionStatus
  }
}
