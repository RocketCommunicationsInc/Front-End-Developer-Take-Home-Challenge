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

  const renderTime = (time) => {
    console.log(time / 60);
    // time is a number type
    let minutes = '';
    let hours = '';
    let seconds = '';
    let finalTime;
    if (time < 3600) {
      let leftover = 0;
      minutes = Math.floor(time / 60);
      seconds = '00';
      finalTime = `00:${minutes}:${seconds}`;
      return finalTime;
    }
  };

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
        errorTime,
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

  // const renderAlerts = () => {
  //   return alertList.map((alert) => {
  //     if (alert.alerts.length > 1) {
  //       const {
  //         _id,
  //         contactName,
  //         contactSatellite,
  //         contactDetail,
  //         contactBeginTimestamp,
  //         contactEndTimestamp,
  //       } = alert;
  //       let alertItem = alert.alerts.map((individualAlert) => {
  //         const { errorMessage, id } = individualAlert;
  //         let time = contactEndTimestamp - contactBeginTimestamp;
  //         time = renderTime(time);
  //         return (
  //           <RuxTableRow key={id}>
  //             <RuxButton
  //               size="small"
  //               className="acknowledge-btn"
  //               onClick={() => singleAcknowledge(_id, id)}
  //             >
  //               Acknowledge
  //             </RuxButton>
  //             <RuxTableCell className="alert-table-row message">
  //               {errorMessage}
  //               <RuxButton
  //                 size="small"
  //                 className="details-btn"
  //                 onClick={() =>
  //                   showModalonClick(contactSatellite, contactDetail)
  //                 }
  //               >
  //                 See Details
  //               </RuxButton>
  //             </RuxTableCell>
  //             <RuxTableCell className="alert-table-row name">
  //               {contactName}
  //             </RuxTableCell>
  //             <RuxTableCell className="alert-table-row time">
  //               {time}
  //             </RuxTableCell>
  //           </RuxTableRow>
  //         );
  //       });
  //       return alertItem;
  //     } else {
  //       const { errorMessage, id } = alert.alerts[0];
  //       const {
  //         _id,
  //         contactName,
  //         contactSatellite,
  //         contactDetail,
  //         contactBeginTimestamp,
  //         contactEndTimestamp,
  //       } = alert;
  //       let time = contactEndTimestamp - contactBeginTimestamp;
  //       time = renderTime(time);
  //       return (
  //         <RuxTableRow key={id}>
  //           <RuxButton
  //             size="small"
  //             className="acknowledge-btn"
  //             onClick={() => singleAcknowledge(_id, id)}
  //           >
  //             Acknowledge
  //           </RuxButton>
  //           <RuxTableCell className="alert-table-row message">
  //             {errorMessage}
  //             <RuxButton
  //               size="small"
  //               className="details-btn"
  //               onClick={() =>
  //                 showModalonClick(contactSatellite, contactDetail)
  //               }
  //             >
  //               See Details
  //             </RuxButton>
  //           </RuxTableCell>
  //           <RuxTableCell className="alert-table-row name">
  //             {contactName}
  //           </RuxTableCell>
  //           <RuxTableCell className="alert-table-row time">{time}</RuxTableCell>
  //         </RuxTableRow>
  //       );
  //     }
  //   });
  // };

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
