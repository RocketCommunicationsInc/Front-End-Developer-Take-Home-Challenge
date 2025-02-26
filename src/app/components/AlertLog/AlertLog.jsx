"use client";

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

import styles from "./AlertLog.module.css";

export function AlertLog({ data = [], doUpdateEntry }) {
  const AlertDetails = ({ alert, contact }) => {
    const [isAcknowledged, setIsAcknowledged] = useState(false);

    // Determines the button text based on whether the alert is acknowledged
    const buttonText = alert.acknowledged ? "Review Details" : "Acknowledge Alert";
    const dialogButtonText = alert.acknowledged ? "Dismiss" : "Acknowledge";

    // Sets the styling of the button depending on alert acknowledgment
    const importantButton = alert.acknowledged;

    // Handles the closing of the dialog and updates the entry
    const dialogClosed = () => {
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
        </RuxButton>

          <RuxDialog
            open={isAcknowledged}
            header={alert.errorMessage}
            confirmText={dialogButtonText}
            denyText=""
          onRuxdialogclosed={() => dialogClosed()} // Corrected the event handler
          >
            <div className={styles.AlertDetailText}>
              <h3>Contact Satellite: {contact.contactSatellite}</h3>
              <p>{contact.contactDetail}</p>
              <p className={styles.ErrorTime}><label className={styles.Label}>Error Time:</label> {alert.errorTimeString}</p>
            </div>
          </RuxDialog>
      </>
    );
  };

  // Returns CSS class based on the severity level of an alert
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
        return ""; // Default class for warnings or unknown severity
    }
  };

  // Returns CSS class if the alert has been acknowledged
  const rowAcknowledgedClass = (acknowledged) => {
    return acknowledged ? styles.RowAcknowledged : "";
  };

  return (
    <>
      <RuxTable>
        <RuxTableHeader>
          <RuxTableHeaderRow className={styles.AlertRow}>
            <RuxTableHeaderCell className={styles.Cell}>Contact</RuxTableHeaderCell>
            <RuxTableHeaderCell className={styles.Cell}>Time Range <div className={styles.TimeFormat}>Year - Date - Time</div></RuxTableHeaderCell>
            <RuxTableHeaderCell className={styles.Cell}>Alerts</RuxTableHeaderCell>
          </RuxTableHeaderRow>
        </RuxTableHeader>
        <RuxTableBody>
          {data.map((item, index) => (
            <RuxTableRow
              key={index}
              className={rowAcknowledgedClass(item.acknowledged)}
            >
              <RuxTableCell className={styles.Cell}>{item.contactName}</RuxTableCell>
              <RuxTableCell className={styles.Cell}>
                <div>{item.contactBeginTimestampString} -{" "}</div>
                <div>{item.contactEndTimestampString}</div>
              </RuxTableCell>
              <RuxTableCell className={styles.Cell}>
                {item.alerts.map((alert, alertIndex) => (
                  <div className={styles.AlertDetailRow} key={alertIndex}>
                    <span className={severityClasses(alert.errorSeverity)}>
                      {alert.errorSeverity}
                    </span>
                    <span className={rowAcknowledgedClass(alert.acknowledged)}>
                      {alert.errorMessage}
                    </span>
                    <AlertDetails alert={alert} contact={item} />
                  </div>
                ))}
                {/* Display message when no alerts are present */}
                {item.alerts.length === 0 && (<span className={styles.NoAlerts}>No alerts</span>)}
              </RuxTableCell>
            </RuxTableRow>
          ))}
        </RuxTableBody>
      </RuxTable>
    </>
  );
}
