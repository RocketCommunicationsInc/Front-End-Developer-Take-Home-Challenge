"use client"

import React, { useState } from "react";
import { RuxContainer } from "@astrouxds/react";
import { AlertLog } from "../AlertLog";
import data from "../../data/data.json";
import styles from "./AlertViewer.module.css";

// Calculate the number of days since the start of the year
function daysInYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24; // Milliseconds in a day
  return Math.floor(diff / oneDay);
}

// Format the date into a specific string format
const formatDate = (date, milliseconds = true) => {
  const millisecondsMultiplier = milliseconds ? 1000 : 1;
  const thisDate = new Date(date * millisecondsMultiplier);
  const options = {
    timeZone: "UTC",
    hour12: false,
  };
  const dateString = `${thisDate.getUTCFullYear()} ${daysInYear(
    thisDate
  )} ${thisDate.toLocaleTimeString("en-US", options)}`;
  return dateString;
};

const transformData = (data) => {
  data.map((item) => {
    item.contactBeginTimestampString = formatDate(item.contactBeginTimestamp);
    item.contactEndTimestampString = formatDate(item.contactEndTimestamp);
    item.earliestAlertErrorTime = new Date();
    item.alerts.forEach((alert) => {
      const thisAlert = alert;
      thisAlert.contactId = item.contactId;
      thisAlert.errorTimeString = formatDate(alert.errorTime, false);
      item.earliestAlertErrorTime =
        alert.errorTime - item.earliestAlertErrorTime
          ? alert.errorTime
          : item.earliestAlertErrorTime;
    });
  });

  data = data.sort((a, b) => {
    return a.earliestAlertErrorTime - b.earliestAlertErrorTime;
  });

  return data;
};

// Counts alerts based on severity and acknowledgment status
const getAlertCounts = (data, severity = null) => {
  return data.reduce((count, item) => {
    return count + item.alerts.filter(
      (alert) => alert.acknowledged !== true && (!severity || alert.errorSeverity === severity)
      ).length;
  }, 0);
};

const AlertViewer = () => {
  const [alertData, setAlertData] = useState(transformData(data));
  const [unacknowledgedCount, setUnacknowledgedCount] = useState(getAlertCounts(data));
  const [criticalCount, setCriticalCount] = useState(getAlertCounts(data, "critical"));
  const [seriousCount, setSeriousCount] = useState(getAlertCounts(data, "serious"));
  const [cautionCount, setCautionCount] = useState(getAlertCounts(data, "caution"));
  const [warningCount, setWarningCount] = useState(getAlertCounts(data, "warning"));

  // Updates all alert counts
  const getAllAlertCounts = (data) => {
    setUnacknowledgedCount(getAlertCounts(data));
    setCriticalCount(getAlertCounts(data, "critical"));
    setSeriousCount(getAlertCounts(data, "serious"));
    setCautionCount(getAlertCounts(data, "caution"));
    setWarningCount(getAlertCounts(data, "warning"));
  };

  // Update a specific alert entry when acknowledged
  const updateOneEntry = ({ alert, contact }) => {
    if (alert.errorId) {
      const alertDataCopy = alertData.map((item) => {
        if (contact.contactId === item.contactId) {
          item.alerts.forEach((a) => {
            if (a.errorId === alert.errorId) {
              a.acknowledged = true;
            }
          });
        }
        return item;
      });
      setAlertData(alertDataCopy);
      getAllAlertCounts(alertDataCopy);
    }
  };

  return (
    <RuxContainer>
      <header slot="header">Alerts</header>
      <div slot="toolbar" className={styles.Toolbar}>
        <span>{unacknowledgedCount} Unacknowledged</span>
        <span>{criticalCount} Critical</span>
        <span>{seriousCount} Serious</span>
        <span>{cautionCount} Caution</span>
        <span>{warningCount} Warning</span>
      </div>
      <AlertLog data={alertData} doUpdateEntry={updateOneEntry} />
    </RuxContainer>
  );
}

export {AlertViewer}
