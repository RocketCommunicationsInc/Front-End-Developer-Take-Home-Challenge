"use client";

import React, { useState } from "react";
import { RuxContainer } from "@astrouxds/react";
import { AlertLog2 } from "../AlertLog2";

import data from "../../data/data.json";

import styles from "./AlertViewer2.module.css";

const transformData = (data) => {
  let justAlerts = [];

  data.map((item, index) => {
    item.contactBeginTimestampString = new Date(
      item.contactBeginTimestamp * 1000
    ).toLocaleString();
    item.contactEndTimestampString = new Date(
      item.contactEndTimestamp * 1000
    ).toLocaleString();
    item.earliestAlertErrorTime = null;
    item.alerts.forEach((alert) => {
      const thisAlert = alert;
      thisAlert.errorTimeString = new Date(alert.errorTime).toLocaleString();
      justAlerts.push(alert);
    });
  });
  justAlerts = justAlerts.sort((a, b) => {
    return a.errorTime - b.errorTime;
  });
  // return justAlerts;
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
