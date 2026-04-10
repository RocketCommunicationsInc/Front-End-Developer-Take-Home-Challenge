'use client';
import { RuxGlobalStatusBar } from '@astrouxds/react';

export default function AppBar() {
  return (
    <RuxGlobalStatusBar
      include-icon="true"
      app-state="Demo"
      app-state-color="tag1"
      username=""
      app-domain="GRM"
      app-name="Dashboard"
      menu-icon="apps"
    ></RuxGlobalStatusBar>
  );
}
