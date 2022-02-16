import React from 'react';
import {
  RuxTable,
  RuxTableHeaderRow,
  RuxTableHeaderCell,
  RuxTableBody,
  RuxTableRow,
  RuxTableCell,
  RuxCheckbox,
} from '@astrouxds/react';

const Alerts = () => {
  return (
    <section className="dashboard-alert">
      <article className="content-header alert-header">
        <h2>Alerts</h2>
      </article>
      <article className="alert-table">
        <RuxTable>
          <RuxTableHeaderRow className="alert-table-header-row">
            <RuxTableHeaderCell className="rux-cell-select alert-header-cell">
              Select
            </RuxTableHeaderCell>
            <RuxTableHeaderCell className="rux-cell-message alert-header-cell">
              Message
            </RuxTableHeaderCell>
            <RuxTableHeaderCell className="rux-cell-name alert-header-cell">
              Name
            </RuxTableHeaderCell>
            <RuxTableHeaderCell className="rux-cell-time alert-header-cell">
              Time
            </RuxTableHeaderCell>
          </RuxTableHeaderRow>
        </RuxTable>
        <RuxTableBody>
          <RuxTableRow>
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
          </RuxTableRow>

        </RuxTableBody>
      </article>
    </section>
  );
};

export default Alerts;
