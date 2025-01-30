import { useState } from "react";
import {
  RuxContainer,
  RuxGlobalStatusBar,
  RuxMonitoringIcon,
} from "@astrouxds/react";
import ContactsTable from "./components/ContactsTable";
import "./App.css";
import contactsJson from "../../data.json";

function App() {
  const appDomain = "GRM";
  const appName = "Dashboard";
  const appVersion = "1.0";
  const menuIcon = "antenna-receive";
  const [contacts, setContacts] = useState(contactsJson);

  function filteredContacts(contacts) {
    return contacts;
  }

  function normalContacts(contacts) {
    return contacts.filter((contact) => contact.alerts.length === 0);
  }

  function filterByErrorSeverity(contacts, severities) {
    //Accept an array of severities and return the contacts
    //having those severities
    return contacts.filter((contact) =>
      contact.alerts.some((alert) => severities.includes(alert.errorSeverity))
    );
  }

  return (
    <>
      <RuxGlobalStatusBar
        className="mb-3 w-full"
        appDomain={appDomain}
        appName={appName}
        appVersion={appVersion}
        includeIcon="true"
        menuIcon={menuIcon}
      >
        <div slot="right-side" className="w-md flex justify-between pr-3">
          <RuxMonitoringIcon
            icon="antenna"
            label="Normal"
            status="normal"
            notifications={normalContacts(contacts).length}
          />
          <RuxMonitoringIcon
            icon="antenna"
            label="Caution"
            status="caution"
            notifications={
              filterByErrorSeverity(contacts, ["caution", "warning"]).length
            }
          />
          <RuxMonitoringIcon
            icon="antenna"
            label="Critical"
            status="critical"
            notifications={
              filterByErrorSeverity(contacts, ["serious", "critical"]).length
            }
          />
        </div>
      </RuxGlobalStatusBar>
      <RuxContainer className="max-w-7xl mx-auto">
        <div slot="header">{appDomain + " " + appName}</div>
        <ContactsTable contacts={filteredContacts(contacts)} />
      </RuxContainer>
    </>
  );
}

export default App;
