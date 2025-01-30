import { useState } from "react";
import { RuxContainer } from "@astrouxds/react";
import ContactsTable from "./components/ContactsTable";
import "./App.css";
import contactsJson from "../../data.json";

function filteredContacts(contacts) {
  return contacts;
}

function App() {
  const pageTitle = "GRM Dashboard";

  return (
    <>
      <RuxContainer>
        <div slot="header">{pageTitle}</div>
        <ContactsTable contacts={filteredContacts(contactsJson)} />
      </RuxContainer>
    </>
  );
}

export default App;
