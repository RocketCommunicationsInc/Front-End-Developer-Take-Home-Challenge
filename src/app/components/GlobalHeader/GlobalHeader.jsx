'use client'
import React from "react";
import { RuxGlobalStatusBar, RuxClock } from "@astrouxds/react";

const GlobalHeader = () => {
  return (
    <RuxGlobalStatusBar
      appDomain="Gwendy Wendell"
      appName="Rocket Coding Challenge"
      includeIcon={true}
      appState="in progress"
    >
      <RuxClock />
    </RuxGlobalStatusBar>
  );
}

export {GlobalHeader}
