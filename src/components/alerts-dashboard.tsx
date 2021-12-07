import React, { useMemo, useState } from 'react';
import {RuxStatus, RuxDatetime, RuxGlobalStatusBar, RuxModal, RuxPushButton, RuxTable, RuxTableCell, RuxTableHeaderCell, RuxTableHeaderRow, RuxTableRow } from '@astrouxds/react';
// This took a bit to dig out, would be nice if it was a top level export
import { Status } from '@astrouxds/astro-web-components/dist/types/common/commonTypes.module';
import contactData from './../data/contact.json';

interface AlertData {
  contactId: string;
  errorId: string;
  errorSeverity: string;
  errorCategory: string;
  errorMessage: string;
  longMessage: string;
  errorTime: number;
  selected: boolean;
  new: boolean;
  expanded: boolean;
  contactTime: number;
}

interface ContactData {
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
  alerts: AlertData[];
}

interface AlertContactsData {
  alerts: AlertData[];
  contacts: Record<string, ContactData>
}

export const AlertsDashboard = () => {
  const [contactInModal, setContactInModal] = useState<AlertData | null>(null);

  const alertContacts = useMemo(() => {
    const contactAlerts: AlertContactsData = contactData.reduce((agg: AlertContactsData, contact): AlertContactsData => {
      if(contact.alerts.length > 0) {
        const alerts: AlertData[] = contact.alerts.map((alert) => ({
          ...alert,
          contactId: contact.contactId,
          contactTime: contact.contactEndTimestamp - contact.contactBeginTimestamp
        }));

       agg.alerts.push(...alerts)
      }

      agg.contacts[contact.contactId] = contact as ContactData;

      return agg;
    }, { alerts: [], contacts: { } });

    const sortedAlerts = contactAlerts.alerts.sort((a, b) => b.errorTime - a.errorTime);
    const contactAlertsSorted = { alerts: sortedAlerts, contacts: contactAlerts.contacts };

    return contactAlertsSorted;
  }, []);

  const modalData = contactInModal ? alertContacts.contacts[contactInModal.contactId] : null;

  return (
    <div>
      <RuxGlobalStatusBar appDomain="Contact" appName="Alert Dashboard" menuIcon='cast' includeIcon/>
      <RuxTable title="Contacts">
        <RuxTableHeaderRow>
          <RuxTableHeaderCell> Alert Time </RuxTableHeaderCell>
          <RuxTableHeaderCell> Error Message </RuxTableHeaderCell>
          <RuxTableHeaderCell> Contact Name</RuxTableHeaderCell>
          <RuxTableHeaderCell> Contact Time </RuxTableHeaderCell>
          <RuxTableHeaderCell> Actions </RuxTableHeaderCell>
        </RuxTableHeaderRow>
          {alertContacts.alerts.map((alert) => {
            const contact = alertContacts.contacts[alert.contactId];
            const isSelected = contact.contactId === contactInModal?.contactId && alert.errorId === contactInModal?.errorId;

            return (
            <RuxTableRow selected={isSelected}>
              <RuxTableCell> 
              <RuxDatetime date={new Date(alert.errorTime)} timeZone="America/Los_Angeles" month="2-digit" day="2-digit" year="2-digit" hour="2-digit" minute="2-digit" />
              </RuxTableCell>
              <RuxTableCell>
                <div className="side-by-side">
                <RuxStatus status={alert.errorSeverity as Status} className="pad-right" />
                {alert.errorMessage}
                </div> 
              </RuxTableCell>
              <RuxTableCell>{contact.contactName}</RuxTableCell>
              <RuxTableCell>{alert.contactTime}ms</RuxTableCell>
              <RuxTableCell>
                <RuxPushButton 
                  size="small"
                  label={"Show Details"}
                  onClick={(() => setContactInModal(alert))}
                  // A few alerts have the same errorId and reference the same contactId, this will result in more than one row showing as having the modal open... in some cases
                  checked={isSelected}/>
              </RuxTableCell>
            </RuxTableRow>
          )
        })}
      </RuxTable>
      
      {}
      <RuxModal open={contactInModal !== null} onRuxmodalclosed={() => setContactInModal(null)} confirmText="close" denyText="" modalTitle={modalData?.contactSatellite ?? ''} modalMessage={modalData?.contactDetail} />
    </div>
  )
}