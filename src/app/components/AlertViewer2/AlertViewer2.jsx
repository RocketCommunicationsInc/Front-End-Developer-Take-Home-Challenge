"use client";

import React, { useState } from "react";
import {
  RuxContainer,
  RuxTab,
  RuxTabs,
  RuxTabPanel,
  RuxTabPanels,
} from "@astrouxds/react";
import { AlertLog2 } from "../AlertLog2";

import data from "../../data/data.json";

import styles from './AlertViewer2.module.css';

export function AlertViewer2({prop = 'default value'}) {
  const [alertData, setAlertData] = useState(data);

  return (
    <RuxContainer>
          <header slot="header">Alerts</header>
              <AlertLog2 data={alertData}  />
        </RuxContainer>
  );
}
