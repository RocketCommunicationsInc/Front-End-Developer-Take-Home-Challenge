"use client";

import React from "react";
import {
  RuxTable,
  RuxTableBody,
  RuxTableCell,
  RuxTableHeader,
  RuxTableHeaderCell,
  RuxTableHeaderRow,
  RuxTableRow,
} from "@astrouxds/react";
import { AlertDetails } from "../AlertDetails";

import styles from "./AlertLog.module.css";

const AlertLog = ({ data = [], doUpdateEntry }) => {

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

  const rowAcknowledgedClass = (acknowledged) => {
    return acknowledged ? styles.RowAcknowledged : "";
  };

  return (
      <RuxTable>
        <RuxTableHeader>
          <RuxTableHeaderRow className={styles.AlertRow}>
            <RuxTableHeaderCell className={styles.Cell}>Contact</RuxTableHeaderCell>
          <RuxTableHeaderCell className={styles.Cell}>
            Time Range <div className={styles.TimeFormat}>Year - Date - Time</div>
          </RuxTableHeaderCell>
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
                <div>{item.contactBeginTimestampString} - </div>
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
                    <AlertDetails alert={alert} contact={item} doUpdateEntry={doUpdateEntry} />
                  </div>
                ))}
              {item.alerts.length === 0 && (
                <span className={styles.NoAlerts}>No alerts</span>
              )}
              </RuxTableCell>
            </RuxTableRow>
          ))}
        </RuxTableBody>
      </RuxTable>
  );
}

export { AlertLog }
