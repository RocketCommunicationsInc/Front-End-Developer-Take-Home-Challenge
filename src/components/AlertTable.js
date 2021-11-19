import React, { useState } from "react";
import {
  RuxStatus,
  RuxTable,
  RuxTableCell,
  RuxTableHeaderCell,
  RuxTableHeaderRow,
  RuxTableRow,
  RuxButton,
  RuxModal,
} from "@astrouxds/react";

const AlertTable = (props) => {
  const [modal, setModal] = useState({
    message: "Loading...",
    title: "Satellite",
    open: false,
  });

  const showModal = (satellite, detail) => {
    setModal({
      message: detail,
      title: satellite,
      open: true,
    });
  };

  return (
    <>
      <RuxTable>
        <RuxTableHeaderRow>
          <RuxTableHeaderCell>Alerts</RuxTableHeaderCell>
          <RuxTableHeaderCell>Status</RuxTableHeaderCell>
          <RuxTableHeaderCell>Contact Name</RuxTableHeaderCell>
          <RuxTableHeaderCell>Contact Time</RuxTableHeaderCell>
          <RuxTableHeaderCell>Actions</RuxTableHeaderCell>
        </RuxTableHeaderRow>
        {props.alerts.length > 0 ? (
          props.alerts.map((alert) => {
            return (
              <RuxTableRow key={alert.errorId} className="alert">
                <RuxTableCell>
                  <p key={alert.errorId}>
                    <span className="alert-message">{alert.errorMessage}</span>
                  </p>
                </RuxTableCell>
                <RuxTableCell>
                  <RuxStatus status={alert.errorSeverity}></RuxStatus>
                </RuxTableCell>
                <RuxTableCell>{alert.contactName}</RuxTableCell>
                <RuxTableCell>
                  {alert.contactTime}
                  <span className="mins"> mins</span>
                </RuxTableCell>
                <RuxTableCell>
                  <RuxButton
                    onClick={() =>
                      showModal(alert.contactSatellite, alert.contactDetail)
                    }
                  >
                    Show Details
                  </RuxButton>
                </RuxTableCell>
              </RuxTableRow>
            );
          })
        ) : (
          <p>Alerts not found.</p>
        )}
      </RuxTable>
      <RuxModal
        modal-message={modal.message}
        modal-title={modal.title}
        open={modal.open}
      />
    </>
  );
};

export default AlertTable;
