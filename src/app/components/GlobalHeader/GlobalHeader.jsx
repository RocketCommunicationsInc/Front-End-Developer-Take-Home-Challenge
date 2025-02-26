'use client'
import React from "react";
import { RuxGlobalStatusBar } from "@astrouxds/react";

const GlobalHeader = () => {
  return (
    <RuxGlobalStatusBar
      appDomain="Gwendy Wendell"
      appName="Rocket Coding Challenge"
      includeIcon={true}
    >
    </RuxGlobalStatusBar>
  );
}

export {GlobalHeader}
