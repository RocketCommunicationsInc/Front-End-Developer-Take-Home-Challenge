import React from 'react';
import {
  RuxTable,
  RuxTableHeaderRow,
  RuxTableHeaderCell,
  RuxTableBody,
  RuxTableRow,
  RuxTableCell,
  RuxButton,
  RuxStatus,
} from '@astrouxds/react';
import { useGlobalContext } from '../context';

const Alerts = () => {
  const {
    alertList,
    openModal,
    modalInfo,
    singleAcknowledge,
    handleSeverityChange,
  } = useGlobalContext();

  // Since all the times were flat minutes, I didn't bother progressing
  // with the fully capable algorithm
  const renderTime = (time) => {
    // time is a number type
    let minutes = '';
    let seconds = '';
    let finalTime;
    if (time < 3600) {
      minutes = Math.floor(time / 60);
      seconds = '00';
      finalTime = `00:${minutes}:${seconds}`;
      return finalTime;
    }
  };

  // Listing the contacts with alerts here since it felt weird to write this much
  // code in the return statement
  const renderAlerts = () => {
    return alertList.map((alert) => {
      const {
        _id,
        alertId,
        contactName,
        contactSatellite,
        contactDetail,
        contactBeginTimestamp,
        contactEndTimestamp,
        errorMessage,
        errorSeverity,
      } = alert;
      let time = contactEndTimestamp - contactBeginTimestamp;
      time = renderTime(time);
      return (
        <RuxTableRow key={alertId}>
          <RuxButton
            size="small"
            className="acknowledge-btn"
            onClick={() => singleAcknowledge(_id, alertId)}
          >
            Acknowledge
          </RuxButton>
          <RuxTableCell className="alert-table-row icon">
            <RuxStatus
              status={errorSeverity}
              className="alert-icon"
            ></RuxStatus>
          </RuxTableCell>
          <RuxTableCell className="alert-table-row message">
            {errorMessage}
            <RuxButton
              size="small"
              className="details-btn"
              onClick={() => showModalonClick(contactSatellite, contactDetail)}
            >
              Show Details
            </RuxButton>
          </RuxTableCell>
          <RuxTableCell className="alert-table-row name">
            {contactName}
          </RuxTableCell>
          <RuxTableCell className="alert-table-row time">{time}</RuxTableCell>
        </RuxTableRow>
      );
    });
  };

  const showModalonClick = (contactSatellite, contactDetail) => {
    modalInfo(contactSatellite, contactDetail);
    openModal();
  };

  return (
    <section className="dashboard-alert">
      <article className="content-header alert-header">
        <h2 className="alert-count">Alerts</h2>
        <h2 className="alert-count">{`(${alertList.length})`}</h2>
      </article>
      <RuxTable>
        <RuxTableHeaderRow className="alert-table-header-row">
          <RuxTableHeaderCell className="alert-cell-select alert-header-cell">
            Select
          </RuxTableHeaderCell>
          <RuxTableHeaderCell className="alert-cell-message alert-header-cell">
            Message
          </RuxTableHeaderCell>
          <RuxTableHeaderCell className="alert-cell-name alert-header-cell">
            Name
          </RuxTableHeaderCell>
          <RuxTableHeaderCell className="alert-cell-time alert-header-cell">
            Time
          </RuxTableHeaderCell>
        </RuxTableHeaderRow>
      </RuxTable>
      <article className="content-table">
        <RuxTableBody>{renderAlerts()}</RuxTableBody>
      </article>
      <article className="alert-btn-container">
        <RuxButton onClick={handleSeverityChange}>Organize Severity</RuxButton>
      </article>
    </section>
  );
};

export default Alerts;
