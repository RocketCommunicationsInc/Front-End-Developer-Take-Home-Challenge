import React, { useState } from "react";
import {
  RuxGlobalStatusBar,
  RuxIcon,
  RuxStatus,
  RuxTable,
  RuxTableCell,
  RuxTableHeader,
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
  const [modal, setModal] = useState({
    message: "Loading...",
    title: "Satellite",
  });

  const showModal = (satellite, detail) => {
    setModal({ message: detail, title: satellite, open: true });
  };

  return (
    <div className="App">
      <RuxGlobalStatusBar>
        <RuxIcon slot="left-side" icon="apps" />
        <div slot="app-meta">
          <h1>Ground Resource Management Control</h1>
        </div>
      </RuxGlobalStatusBar>
      <h2>Contact Alerts</h2>
      <RuxTable>
        <RuxTableHeaderRow>
          <RuxTableHeaderCell>Alerts</RuxTableHeaderCell>
          <RuxTableHeaderCell>Contact Name</RuxTableHeaderCell>
          <RuxTableHeaderCell>Contact Time</RuxTableHeaderCell>
          <RuxTableHeaderCell>Actions</RuxTableHeaderCell>
        </RuxTableHeaderRow>
        {contacts.length > 0 ? (
          contacts.map((contact) => {
            return (
              <RuxTableRow key={contact.contactId} className="contact">
                <RuxTableCell>
                  {contact.alerts.length > 0
                    ? contact.alerts.map((alert) => {
                        return (
                          <p
                            key={alert.errorId}
                            className={`alert ${alert.errorSeverity}`}
                          >
                            <span className="alert-message">
                              {alert.errorMessage}
                            </span>
                          </p>
                        );
                      })
                    : ""}
                </RuxTableCell>
                <RuxTableCell>{contact.contactName}</RuxTableCell>
                <RuxTableCell>
                  {calculateTime(
                    contact.contactBeginTimestamp,
                    contact.contactEndTimestamp
                  )}
                  <span className="mins"> mins</span>
                </RuxTableCell>
                <RuxTableCell>
                  <RuxButton
                    onClick={() =>
                      showModal(contact.contactSatellite, contact.contactDetail)
                    }
                  >
                    Show Details
                  </RuxButton>
                </RuxTableCell>
              </RuxTableRow>
            );
          })
        ) : (
          <p>Contacts not found.</p>
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
