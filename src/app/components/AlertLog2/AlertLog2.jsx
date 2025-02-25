import React, { useState } from "react";
import {
  RuxButton,
  RuxDialog,
  RuxTable,
  RuxTableBody,
  RuxTableCell,
  RuxTableHeader,
  RuxTableHeaderCell,
  RuxTableHeaderRow,
  RuxTableRow,
} from "@astrouxds/react";

import styles from "./AlertLog2.module.css";

export function AlertLog2({ data = [], doUpdateEntry }) {
  const AlertDetails = ({ alert, contact }) => {
    const [isAcknowledged, setIsAcknowledged] = useState(false);

    const buttonText =
      alert.acknowledged === true ? "Review Details" : "Acknowledge Alert";
    const dialogButtonText =
      alert.acknowledged === true ? "Dismiss" : "Acknowledge";
    const importantButton = alert.acknowledged;

    const dialogClosed = ({ alert, contact }) => {
      setIsAcknowledged(false);
      doUpdateEntry({ alert, contact });
    };

    return (
      <>
        <RuxButton
          size="small"
          secondary={importantButton}
          borderless={importantButton}
          onClick={() => setIsAcknowledged(true)}
        >
          {buttonText}

          <RuxDialog
            open={isAcknowledged}
            header={alert.errorMessage}
            confirmText={dialogButtonText}
            denyText=""
            ruxdialogclosed={true}
            onRuxdialogclosed={() => dialogClosed({ alert, contact })}
          >
            <div className={styles.AlertDetailText}>
              <h3>Contact Satellite: {contact.contactSatellite}</h3>
              <p>Contact Detail: {contact.contactDetail}</p>
            </div>
          </RuxDialog>
        </RuxButton>
      </>
    );
  };

  const severityClasses = (severityLevel) => {
    switch (severityLevel) {
      case "critical":
        return styles.AlertSeverityCritical;
      case "caution":
        return styles.AlertSeverityCaution;
      case "serious":
        return styles.AlertSeveritySerious;
      case "warning":
      default:
        return "";
    }
  };

  const rowAcknowledgedClass = (acknowledged) => {
    if (acknowledged) {
      return styles.RowAcknowledged;
    }
  };

  return (
    <>
      <RuxTable>
        <RuxTableHeader>
          <RuxTableHeaderRow>
            <RuxTableHeaderCell>Contact</RuxTableHeaderCell>
            <RuxTableHeaderCell>Time</RuxTableHeaderCell>
            <RuxTableHeaderCell>Alerts</RuxTableHeaderCell>
          </RuxTableHeaderRow>
        </RuxTableHeader>
        <RuxTableBody>
          {data.map((item, index) => (
            <RuxTableRow
              key={index}
              className={rowAcknowledgedClass(item.acknowledged)}
            >
              <RuxTableCell>{item.contactName}</RuxTableCell>
              <RuxTableCell>
                {item.contactBeginTimestampString} -{" "}
                {item.contactEndTimestampString}
              </RuxTableCell>
              <RuxTableCell>
                {item.alerts.map((alert, index) => (
                  <div className={styles.AlertDetailRow} key={index}>
                    <span className={severityClasses(alert.errorSeverity)}>
                      {alert.errorSeverity}
                    </span>
                    <span className={rowAcknowledgedClass(alert.acknowledged)}>
                      {alert.errorMessage}
                    </span>
                    <AlertDetails alert={alert} contact={item} />
                  </div>
                ))}
              </RuxTableCell>
            </RuxTableRow>
          ))}
        </RuxTableBody>
      </RuxTable>
    </>
  );
}
