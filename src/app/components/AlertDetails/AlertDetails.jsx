"use client";

import React, { useState } from "react";
import { RuxButton, RuxDialog } from "@astrouxds/react";

import styles from "./AlertDetails.module.css";

const AlertDetails = ({ alert, contact, doUpdateEntry, severityClasses }) => {
  const [isAcknowledged, setIsAcknowledged] = useState(false);

  const buttonText = alert.acknowledged
    ? "Review Details"
    : "Acknowledge Alert";
  const dialogButtonText = alert.acknowledged ? "Dismiss" : "Acknowledge";

  const dialogClosed = () => {
    setIsAcknowledged(false);
    doUpdateEntry({ alert, contact });
  };

  return (
    <>
      <RuxButton
        size="small"
        secondary={alert.acknowledged}
        borderless={alert.acknowledged}
        onClick={() => setIsAcknowledged(true)}
        icon={(alert.acknowledged)? "check-box" : ""}
      >
        {buttonText}
      </RuxButton>

      <RuxDialog
        open={isAcknowledged}
        confirmText={dialogButtonText}
        denyText=""
        onRuxdialogclosed={dialogClosed}
      >
        <div slot="header">{alert.errorMessage} <small className={`${severityClasses(alert.errorSeverity)} ${styles.AlertSeverity}`}>{alert.errorSeverity}</small></div>
        <div className={styles.AlertDetailText}>
          <h3>Contact Satellite: {contact.contactSatellite}</h3>
          <p>{contact.contactDetail}</p>
          <p className={styles.ErrorTime}>
            <label className={styles.Label}>Error Time:</label>{" "}
            {alert.errorTimeString}
          </p>
        </div>
      </RuxDialog>
    </>
  );
};

export { AlertDetails };
