'use client'

import React from 'react';
import {
  RuxContainer,
  RuxTab,
  RuxTabs,
  RuxTabPanel,
  RuxTabPanels,
} from "@astrouxds/react";

import styles from './AlertViewer.module.css';

export function AlertViewer() {
  return (

      <RuxContainer
      >
        <header slot="header">Alerts</header>
        <RuxTabs slot="tab-bar" id="tab-set-1" small={true}>
          <RuxTab id="tab-id-1" selected={true}>Grid</RuxTab>
          <RuxTab id="tab-id-2">List</RuxTab>
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
            <p>tag set list</p>
          </RuxTabPanel>
        </RuxTabPanels>
      </RuxContainer>
  );
}
