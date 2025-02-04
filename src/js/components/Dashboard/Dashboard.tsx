import { RuxClock, RuxGlobalStatusBar } from "@astrouxds/react";

import AppProvider from "../../providers/AppProvider";
import AlertList from "../AlertList/AlertList";

import "/src/css/components/Dashboard/Dashboard.css";

function Dashboard() {
  return (
    <AppProvider>
      <div className="dashboard">
        <RuxGlobalStatusBar
          appDomain="GRM"
          appName="Dashboard"
          appVersion="1.0"
          username="T. Devine"
          appState="Demo"
          appStateColor="tag1"
        >
          <RuxClock />
        </RuxGlobalStatusBar>
        <AlertList />
      </div>
    </AppProvider>
  );
}

export default Dashboard;
