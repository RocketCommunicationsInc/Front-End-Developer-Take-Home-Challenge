'use client'
import React from "react";
import { RuxGlobalStatusBar } from "@astrouxds/react";

const GlobalHeader = () => {
  return (
    <RuxGlobalStatusBar
      appDomain="Gwendy Wendell"
      appName="Rocket Coding Challenge"
      includeIcon={true}
      appState="in progress"
    >
    </RuxGlobalStatusBar>
  );
}

export {GlobalHeader}
