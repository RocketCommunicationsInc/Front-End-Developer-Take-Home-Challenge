"use client";

import React, { useState } from "react";
import { RuxContainer } from "@astrouxds/react";
import { AlertLog2 } from "../AlertLog2";

import data from "../../data/data.json";

import styles from "./AlertViewer2.module.css";

function daysInYear(date){
  return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
}

const formatDate = (date, milliseconds = true) => {
  const millisecondsMultiplier = (milliseconds) ? 1000 : 1;
  const thisDate = new Date(date * millisecondsMultiplier);
  const options = {
    timeZone : "UTC",
    hour12: false,
  }
  const dateString = `${thisDate.getUTCFullYear()} ${daysInYear(thisDate)} ${thisDate.toLocaleTimeString('en-US', options)}`
  return dateString;
};

const transformData = (data) => {
  data.map((item, index) => {
    item.contactBeginTimestampString = formatDate(item.contactBeginTimestamp);
    item.contactEndTimestampString = formatDate(item.contactEndTimestamp);
    item.earliestAlertErrorTime = new Date();
    item.alerts.forEach((alert) => {
      const thisAlert = alert;
      thisAlert.errorTimeString = formatDate(alert.errorTime, false);
      item.earliestAlertErrorTime = (alert.errorTime - item.earliestAlertErrorTime)? alert.errorTime : item.earliestAlertErrorTime;
    });
  });

  data = data.sort((a, b) => {
    return a.earliestAlertErrorTime - b.earliestAlertErrorTime;
  });

  return data;
};

export function AlertViewer2() {
  const [alertData, setAlertData] = useState(transformData(data));

  const updateOneEntry = ({ alert, contact }) => {
    if (alert.errorId) {
      const alertDataCopy = alertData.map((item) => {
        if (contact.contactId === item.contactId) {
          item.alerts.forEach((a) => {
            if (a.errorId === alert.errorId) {
              a.acknowledged = true;
            }
          });
          return item;
        } else {
          return item;
        }
      });
      setAlertData(alertDataCopy);
    }
  };

  return (
    <RuxContainer>
      <header slot="header">Alerts</header>
      <AlertLog2 data={alertData} doUpdateEntry={updateOneEntry} />
    </RuxContainer>
  );
}
