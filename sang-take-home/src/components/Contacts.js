import React from 'react';
import {
  RuxTable,
  RuxTableHeaderRow,
  RuxTableHeaderCell,
  RuxTableBody,
  RuxTableRow,
  RuxTableCell,
} from '@astrouxds/react';
import { useGlobalContext } from '../context';
/*
TODO: 
-fix classNames of the RuxTableHeaderCells and its parents
-fix the margin/padding to match
*/

const Contacts = () => {
  const { nonAlertList } = useGlobalContext();

  const renderContacts = () => {
    return nonAlertList.map((contact) => {
      const { _id: id, contactName, contactEquipment, contactState } = contact;
      return (
        <RuxTableRow key={id} className="contact-row-table">
          <RuxTableCell className="contact-table-cell contact-alert-name">
            {contactName}
          </RuxTableCell>
          <RuxTableCell className="contact-table-cell contact-alert-equipment">
            {contactEquipment}
          </RuxTableCell>
          <RuxTableCell className="contact-table-cell contact-alert-state">
            {contactState}
          </RuxTableCell>
        </RuxTableRow>
      );
    });
  };

  return (
    <section className="dashboard-contacts">
      <article className="content-header contact-header">
        <h2>Contacts</h2>
      </article>
      <RuxTable>
        <RuxTableHeaderRow className="alert-table-header-row">
          <RuxTableHeaderCell className="contact-cell-name contact-header-cell">
            Name
          </RuxTableHeaderCell>
          <RuxTableHeaderCell className="contact-cell-select contact-header-cell">
            Equipment String
          </RuxTableHeaderCell>
          <RuxTableHeaderCell className="contact-cell-time contact-header-cell">
            Status
          </RuxTableHeaderCell>
        </RuxTableHeaderRow>
      </RuxTable>
      <article className="content-table contact-table">
        <RuxTableBody>{renderContacts()}</RuxTableBody>
      </article>
    </section>
  );
};

export default Contacts;
