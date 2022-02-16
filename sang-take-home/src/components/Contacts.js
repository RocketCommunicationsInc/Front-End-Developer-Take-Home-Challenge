import React from 'react';
import {
  RuxTable,
  RuxTableHeaderRow,
  RuxTableHeaderCell,
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
    </section>
  );
};

export default Contacts;
