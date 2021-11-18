import React, { useState, useEffect } from "react";
import {
  RuxGlobalStatusBar,
  RuxIcon,
  RuxStatus,
  RuxTable,
  RuxTableCell,
  RuxTableHeaderCell,
  RuxTableHeaderRow,
  RuxTableRow,
  RuxButton,
  RuxModal,
} from "@astrouxds/react";
import { calculateTime } from "./helpers.js";
import * as Contacts from "./data.json";
import "./App.css";

const App = () => {
  const filteredContacts = Contacts.default.filter((c) => c.alerts.length > 0);
  const [contacts, setContacts] = useState(filteredContacts);
  var [alerts, setAlerts] = useState([]);
  const [modal, setModal] = useState({
    message: "Loading...",
    title: "Satellite",
    open: false,
  });

  useEffect(() => {
    getAlerts(contacts);
  }, [contacts]);

  const showModal = (satellite, detail) => {
    setModal({ message: detail, title: satellite, open: true });
  };

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
      //console.log(allAlerts);
    }
  };

  return (
    <div className="App">
      <RuxGlobalStatusBar>
        <RuxIcon slot="left-side" icon="apps" />
        <div slot="app-meta">
          <h1>Ground Resource Management Control</h1>
        </div>
      </RuxGlobalStatusBar>
      <h2>Alerts</h2>
      <RuxTable>
        <RuxTableHeaderRow>
          <RuxTableHeaderCell>Alerts</RuxTableHeaderCell>
          <RuxTableHeaderCell>Status</RuxTableHeaderCell>
          <RuxTableHeaderCell>Contact Name</RuxTableHeaderCell>
          <RuxTableHeaderCell>Contact Time</RuxTableHeaderCell>
          <RuxTableHeaderCell>Actions</RuxTableHeaderCell>
        </RuxTableHeaderRow>
        {alerts.length > 0 ? (
          alerts.map((alert) => {
            return (
              <RuxTableRow key={alert.errorId} className="alert">
                <RuxTableCell>
                  <p key={alert.errorId}>
                    <span className="alert-message">{alert.errorMessage}</span>
                  </p>
                </RuxTableCell>
                <RuxTableCell>
                  <RuxStatus status={alert.errorSeverity}></RuxStatus>
                </RuxTableCell>
                <RuxTableCell>{alert.contactName}</RuxTableCell>
                <RuxTableCell>
                  {alert.contactTime}
                  <span className="mins"> mins</span>
                </RuxTableCell>
                <RuxTableCell>
                  <RuxButton
                    onClick={() =>
                      showModal(alert.contactSatellite, alert.contactDetail)
                    }
                  >
                    Show Details
                  </RuxButton>
                </RuxTableCell>
              </RuxTableRow>
            );
          })
        ) : (
          <p>Alerts not found.</p>
        )}
      </RuxTable>
      <RuxModal
        modal-message={modal.message}
        modal-title={modal.title}
        open={modal.open}
      />
    </div>
  );
};

export default App;
