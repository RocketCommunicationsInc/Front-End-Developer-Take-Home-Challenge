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
} from "@astrouxds/react";
import { calculateTime } from "./helpers.js";
import * as Contacts from "./data.json";
import "./App.css";

const App = () => {
  const filteredContacts = Contacts.default.filter((c) => c.alerts.length > 0);
  const [contacts, setContacts] = useState(filteredContacts);

  return (
    <div className="App">
      <RuxGlobalStatusBar>
        <RuxIcon slot="left-side" icon="apps" />
        <div slot="app-meta">
          <h1>Ground Resource Management Control</h1>
        </div>
      </RuxGlobalStatusBar>
      <h2>Contacts</h2>
      <RuxTable>
        <RuxTableHeaderRow>
          <RuxTableHeaderCell>Alerts</RuxTableHeaderCell>
          <RuxTableHeaderCell>Contact Name</RuxTableHeaderCell>
          <RuxTableHeaderCell>Contact Time</RuxTableHeaderCell>
          {/* <RuxTableHeaderCell>Satellite</RuxTableHeaderCell>
          <RuxTableHeaderCell>Details</RuxTableHeaderCell>
          <RuxTableHeaderCell>Status</RuxTableHeaderCell> */}
        </RuxTableHeaderRow>

        {contacts.length > 0 ? (
          contacts.map((contact) => {
            return (
              <RuxTableRow key={contact.contactId} className="contact">
                <RuxTableCell>
                  {contact.alerts.length > 0
                    ? contact.alerts.map((alert) => {
                        return (
                          <p className={`alert ${alert.errorSeverity}`}>
                            {alert.errorMessage}
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
                {/* <RuxTableCell>{contact.contactSatellite}</RuxTableCell>
                <RuxTableCell>{contact.contactDetail}</RuxTableCell>
                <RuxTableCell>
                  <RuxStatus status={contact.contactStatus}></RuxStatus>
                </RuxTableCell> */}
              </RuxTableRow>
            );
          })
        ) : (
          <p>Contacts not found.</p>
        )}
      </RuxTable>
    </div>
  );
};

export default App;
