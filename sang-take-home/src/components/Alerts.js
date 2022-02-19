import React, { useState } from 'react';
import {
  RuxTable,
  RuxTableHeaderRow,
  RuxTableHeaderCell,
  RuxTableBody,
  RuxTableRow,
  RuxTableCell,
  RuxCheckbox,
  RuxButton,
} from '@astrouxds/react';
import { useGlobalContext } from '../context';

const Alerts = () => {
  const { alertList, openModal, modalInfo, singleAcknowledge } =
    useGlobalContext();
  const [acknowledged, setAcknowledge] = useState([]);
  const [checkList, setCheckList] = useState([]);

  const renderTime = (time) => {
    // time is a number type
    let minutes = '';
    let hours = '';
    let seconds = '';
    let finalTime;
    if (time.toString().length <= 4) {
      let leftover = 0;
      minutes = Math.floor(time / 60);
      seconds = '00';
      finalTime = `00:${minutes}:${seconds}`;
      return finalTime;
    }
  };

  /* 
  * When selecting alertItem with multiple alerts
  * We just need to have the single alertItem and the list of alerts greater than 1

  * When selecting alertItem with just 1 alert
  */

  // sortedAlertsData.forEach((e) => {
  //   console.log(
  //     'Error Time',
  //     `${e.alerts[0].errorTime}`,
  //     `${e.alerts[0].errorMessage}`
  //   );
  // });

  const renderAlerts = () => {
    return alertList.map((alert) => {
      if (alert.alerts.length > 1) {
        const {
          _id,
          contactName,
          contactSatellite,
          contactDetail,
          contactBeginTimestamp,
          contactEndTimestamp,
        } = alert;
        let alertItem = alert.alerts.map((individualAlert) => {
          const { errorMessage, id } = individualAlert;
          let time = contactEndTimestamp - contactBeginTimestamp;
          time = renderTime(time);
          return (
            <RuxTableRow key={id}>
              <RuxButton
                size="small"
                className="acknowledge-btn"
                onClick={() => singleAcknowledge(_id, id)}
              >
                Acknowledge
              </RuxButton>
              <RuxTableCell className="alert-table-row message">
                {errorMessage}
                <RuxButton
                  size="small"
                  className="details-btn"
                  onClick={() =>
                    showModalonClick(contactSatellite, contactDetail)
                  }
                >
                  See Details
                </RuxButton>
              </RuxTableCell>
              <RuxTableCell className="alert-table-row name">
                {contactName}
              </RuxTableCell>
              <RuxTableCell className="alert-table-row time">
                {time}
              </RuxTableCell>
            </RuxTableRow>
          );
        });
        return alertItem;
      } else {
        const { errorMessage, id } = alert.alerts[0];
        const {
          _id,
          contactName,
          contactSatellite,
          contactDetail,
          contactBeginTimestamp,
          contactEndTimestamp,
        } = alert;
        let time = contactEndTimestamp - contactBeginTimestamp;
        time = renderTime(time);
        return (
          <RuxTableRow key={id}>
            <RuxButton
              size="small"
              className="acknowledge-btn"
              onClick={() => singleAcknowledge(_id, id)}
            >
              Acknowledge
            </RuxButton>
            <RuxTableCell className="alert-table-row message">
              {errorMessage}
              <RuxButton
                size="small"
                className="details-btn"
                onClick={() =>
                  showModalonClick(contactSatellite, contactDetail)
                }
              >
                See Details
              </RuxButton>
            </RuxTableCell>
            <RuxTableCell className="alert-table-row name">
              {contactName}
            </RuxTableCell>
            <RuxTableCell className="alert-table-row time">{time}</RuxTableCell>
          </RuxTableRow>
        );
      }
    });
  };

  /* Good Version - Keep safe
  const renderAlerts = () => {
    return alertList.map((alert) => {
      const { errorMessage } = alert.alerts[0];
      const {
        _id: id,
        contactName,
        contactSatellite,
        contactDetail,
        contactBeginTimestamp,
        contactEndTimestamp,
      } = alert;
      let time = contactEndTimestamp - contactBeginTimestamp;
      time = renderTime(time);
      return (
        <RuxTableRow key={id}>
          <RuxCheckbox
            onClick={(e) => selectItem(e, id)}
            className="alert-table-row checkbox"
          ></RuxCheckbox>
          <RuxTableCell className="alert-table-row message">
            {errorMessage}
            <RuxButton
              size="small"
              className="details-btn"
              onClick={() => showModalonClick(contactSatellite, contactDetail)}
            >
              See Details
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
  */

  const showModalonClick = (contactSatellite, contactDetail) => {
    modalInfo(contactSatellite, contactDetail);
    openModal();
  };

  return (
    <section className="dashboard-alert">
      <article className="content-header alert-header">
        <h2>Alerts</h2>
      </article>
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
      <article className="alert-table">
        <RuxTableBody>{renderAlerts()}</RuxTableBody>
      </article>
      <article className="alert-btn-container">
        <RuxButton>Severity</RuxButton>
      </article>
    </section>
  );
};

export default Alerts;
