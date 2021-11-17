import React, { useState } from "react";
import "./App.css";
import {
  RuxGlobalStatusBar,
  RuxIcon,
  RuxTable,
  RuxTableCell,
  RuxTableHeader,
  RuxTableHeaderCell,
  RuxTableHeaderRow,
  RuxTableRow,
} from "@astrouxds/react";
import * as Contacts from "./data.json";

const App = () => {
  const [contacts, setContacts] = useState(Contacts.default);

  console.log("------------------------------------");
  console.log("contacts: ", contacts);
  console.log("------------------------------------");

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
          <RuxTableHeaderCell>Name</RuxTableHeaderCell>
          <RuxTableHeaderCell>Satellite</RuxTableHeaderCell>
          <RuxTableHeaderCell>Details</RuxTableHeaderCell>
          <RuxTableHeaderCell>Status</RuxTableHeaderCell>
        </RuxTableHeaderRow>

        {contacts.length > 0 ? (
          contacts.map((contact) => {
            return (
              <RuxTableRow key={contact.contactId} className="contact">
                <RuxTableCell>{contact.contactName}</RuxTableCell>
                <RuxTableCell>{contact.contactSatellite}</RuxTableCell>
                <RuxTableCell>{contact.contactDetail}</RuxTableCell>
                <RuxTableCell>{contact.contactStatus}</RuxTableCell>
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
