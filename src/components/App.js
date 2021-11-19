import React, { useState, useEffect } from "react";
import { RuxGlobalStatusBar, RuxIcon } from "@astrouxds/react";
import AlertTable from "./AlertTable.js";
import { calculateTime } from "../helpers.js";
import * as Contacts from "../data.json";
import "../App.css";

const App = () => {
  const filteredContacts = Contacts.default.filter((c) => c.alerts.length > 0);
  const [contacts, setContacts] = useState(filteredContacts);
  var [alerts, setAlerts] = useState([]);

  useEffect(() => {
    getAlerts(contacts);
  }, [contacts]);

  const getAlerts = (contacts) => {
    if (contacts) {
      const allAlerts = [];
      contacts.forEach(function (item, index, arr) {
        if (item.alerts) {
          item.alerts.forEach(function (alert, index, arr) {
            allAlerts.push({
              errorId: alert.errorId,
              errorMessage: alert.errorMessage,
              errorTime: alert.errorTime,
              errorSeverity: alert.errorSeverity,
              contactSatellite: item.contactSatellite,
              contactName: item.contactName,
              contactTime: calculateTime(
                item.contactBeginTimestamp,
                item.contactEndTimestamp
              ),
              contactDetail: item.contactDetail,
            });
          });
        }
      });
      setAlerts(allAlerts.sort((a, b) => (a.errorTime > b.errorTime ? 1 : -1)));
    }
  };

  return (
    <div className="App">
      <RuxGlobalStatusBar>
        <RuxIcon slot="left-side" icon="satellite" />
        <div slot="app-meta">
          <h1>Ground Resource Management Control</h1>
        </div>
      </RuxGlobalStatusBar>
      <h2>Alerts</h2>
      <AlertTable alerts={alerts} />
    </div>
  );
};

export default App;
