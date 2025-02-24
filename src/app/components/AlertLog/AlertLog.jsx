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
  const DetailCell = (entry) => {
    const item = entry.item;
    const [isAcknowledged, setIsAcknowledged] = useState(false);

    const buttonText =
    item.acknowledged === true ? "Review Details" : "Acknowledge Alert";
    const importantButton = item.acknowledged

    const dialogClosed = (thisItem) => {
      setIsAcknowledged(false);
      doUpdateEntry(thisItem);
    };

    return (
      <RuxButton
        size="small"
        secondary={importantButton}
        borderless={importantButton}
        onClick={() => setIsAcknowledged(true)}
      >
        {buttonText}
        <RuxDialog
          open={isAcknowledged}
          header={item.errorMessage}
          confirmText="Acknowledge"
          denyText=""
          ruxdialogclosed={true}
          onRuxdialogclosed={() => dialogClosed(item)}
        >
          <h3>Contact Satellite: {item.contactSatellite}</h3>
          <p>Contact Detail: {item.contactDetail}</p>
        </RuxDialog>
      </RuxButton>
    );
  };

  const severityClasses = (severityLevel) => {
    switch (severityLevel) {
      case "critical":
        return styles.AlertSeverityCritical
      case "caution":
        return styles.AlertSeverityCaution
      case "serious":
        return styles.AlertSeveritySerious
      case "warning":
      default:
        return ""
    }
  }

  const rowAcknowledgedClass = (acknowledged) => {
    if (acknowledged) {
      return styles.RowAcknowledged
    }
  }

  return (
    <>
      <RuxTable className={styles.AlertLog}>
        <RuxTableHeader>
          <RuxTableHeaderRow>
            <RuxTableHeaderCell>Severity</RuxTableHeaderCell>
            <RuxTableHeaderCell>Message</RuxTableHeaderCell>
            <RuxTableHeaderCell>Time</RuxTableHeaderCell>
            <RuxTableHeaderCell>Contact</RuxTableHeaderCell>
            <RuxTableHeaderCell>Acknowledged</RuxTableHeaderCell>
          </RuxTableHeaderRow>
        </RuxTableHeader>
        <RuxTableBody>
          {data.map((item, index) => (
            <RuxTableRow key={index} className={rowAcknowledgedClass(item.acknowledged)}>
              <RuxTableCell className={severityClasses(item.errorSeverity)}>{item.errorSeverity}</RuxTableCell>
              <RuxTableCell>{item.errorMessage}</RuxTableCell>
              {/* todo: work out time sorting and display */}
              <RuxTableCell>
                {item.contactBeginTimestampString} -{" "}
                {item.contactEndTimestampString}
              </RuxTableCell>
              <RuxTableCell>{item.contactName}</RuxTableCell>
              <RuxTableCell>
                <DetailCell item={item} />
              </RuxTableCell>
            </RuxTableRow>
          ))}
        </RuxTableBody>
      </RuxTable>
    </>
  );
}
