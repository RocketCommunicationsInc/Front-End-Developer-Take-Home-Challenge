'use client'

import React, {useState} from 'react';
import {
  RuxContainer,
  RuxTab,
  RuxTabs,
  RuxTabPanel,
  RuxTabPanels,
} from "@astrouxds/react";
import { AlertLog } from '../AlertLog';

import data from "../../data/data.json"

import styles from './AlertViewer.module.css';

const transformData = (data) => {
  let justAlerts = []

  data.filter((item) => item.alerts.length > 0).map((item, index) => {
      item.alerts.forEach(alert => {
        const thisAlert = alert
        thisAlert.acknoledged = false
        thisAlert.errorTimeString = new Date(alert.errorTime).toLocaleString()
        thisAlert.contactSatellite = item.contactSatellite
        thisAlert.contactDetail = item.contactDetail
        thisAlert.contactName = item.contactName
        thisAlert.contactBeginTimestamp = item.contactBeginTimestamp
        thisAlert.contactEndTimestamp = item.contactEndTimestamp
        thisAlert.contactBeginTimestampString = new Date(item.contactBeginTimestamp * 1000).toLocaleString()
        thisAlert.contactEndTimestampString = new Date(item.contactEndTimestamp * 1000).toLocaleString()
        justAlerts.push(alert)
      });
  })
  justAlerts = justAlerts.sort((a, b) => {return a.errorTime - b.errorTime})
  return justAlerts
}

export function AlertViewer() {
  const [alertData, setAlertData] = useState(transformData(data));

  return (

      <RuxContainer
      >
        <header slot="header">Alerts</header>
        <RuxTabs slot="tab-bar" id="tab-set-1" small={true}>
          <RuxTab id="tab-id-1">Grid</RuxTab>
          <RuxTab id="tab-id-2" selected={true}>List</RuxTab>
        </RuxTabs>
        <div slot="toolbar">
          <span>30 Total</span>
          <span>|</span>
          <span>Filters</span>
          <span>20 New</span>
          <span>10 Acknowledged</span>
          <span>5 Critical</span>
          <span>2 Serious</span>
          <span>2 Caution</span>
          <span>2 Warning</span>
          <span>Clear Filters</span>
        </div>
        <RuxTabPanels aria-labelledby="tab-set-1">
          <RuxTabPanel aria-labelledby="tab-id-1">
            <p>tag set grid</p>
          </RuxTabPanel>
          <RuxTabPanel aria-labelledby="tab-id-2">
            <AlertLog data={alertData} />
          </RuxTabPanel>
        </RuxTabPanels>
      </RuxContainer>
  );
}
