import React from 'react';
import {
  RuxTable,
  RuxTableHeaderRow,
  RuxTableHeaderCell,
  RuxTableBody,
} from '@astrouxds/react';

/*
TODO: 
-fix classNames of the RuxTableHeaderCells and its parents
-fix the margin/padding to match
*/

const Contacts = () => {
  return (
    <section className="dashboard-contacts">
      <article className="content-header contact-header">
        <h2>Contacts</h2>
      </article>
      <RuxTable>
        <RuxTableHeaderRow className="alert-table-header-row">
          <RuxTableHeaderCell className="rux-cell-name alert-header-cell">
            Name
          </RuxTableHeaderCell>
          <RuxTableHeaderCell className="rux-cell-select alert-header-cell">
            Equipment String
          </RuxTableHeaderCell>
          <RuxTableHeaderCell className="rux-cell-time alert-header-cell">
            Status
          </RuxTableHeaderCell>
        </RuxTableHeaderRow>
      </RuxTable>
      <article className="alert-table">
        <RuxTableBody>
          {/* <RuxTableRow>
            <RuxCheckbox className="alert-table-row checkbox"></RuxCheckbox>
            <RuxTableCell className="alert-table-row message">
              Test
            </RuxTableCell>
            <RuxTableCell className="alert-table-row name">Test</RuxTableCell>
            <RuxTableCell className="alert-table-row time">Test</RuxTableCell>
          </RuxTableRow>
          <RuxTableRow>
            <RuxCheckbox className="alert-table-row checkbox"></RuxCheckbox>
            <RuxTableCell>Test</RuxTableCell>
            <RuxTableCell>Test</RuxTableCell>
            <RuxTableCell>Test</RuxTableCell>
          </RuxTableRow> */}
        </RuxTableBody>
      </article>
    </section>
  );
};

export default Contacts;
