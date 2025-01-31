import { useEffect, useState } from "react";
import {
  RuxContainer,
  RuxGlobalStatusBar,
  RuxMonitoringIcon,
  RuxSegmentedButton,
  RuxSelect,
  RuxOption,
} from "@astrouxds/react";
import ContactsTable from "./components/ContactsTable";
import "./App.css";
import contactsJson from "../../data.json";

function App() {
  const appName = "GRM Dashboard";
  const appVersion = "1.0";
  const menuIcon = "antenna-receive";
  const alertStates = ["caution", "warning"];
  const criticalStates = ["serious", "critical"];
  const [contacts, setContacts] = useState(contactsJson);
  const [segmentOptions, setSegmentOptions] = useState([
    { label: "All" },
    { label: "Only Alerts", selected: true },
    { label: "Unacknowledged" },
  ]);
  const [selectedSegment, setSelectedSegment] = useState("Only Alerts");
  const [errorSeverities, setErrorSeverities] = useState([]);
  const [selectedSeverity, setSelectedSeverity] = useState("all");

  useEffect(() => {
    //Here we may want to query the API for the contact data
    //instead of loading it from a file

    //Once we have the data, we need to get a list of all the
    //errorSeverity values in the dataset for filtering
    setErrorSeverities(() => {
      return Array.from(
        new Set(
          contacts
            .map((contact) =>
              contact.alerts.map((alert) => alert.errorSeverity)
            )
            .flat()
        )
      );
    });
  }, [contacts]);

  function filteredContacts() {
    let filteredContacts = contacts;

    //First filter by the segment we are looking at
    switch (selectedSegment) {
      case "All":
      default:
        //do nothing
        break;
      case "Only Alerts":
        filteredContacts = filterByErrorSeverity(
          contacts,
          alertStates.concat(criticalStates)
        );
        break;
      case "Unacknowledged":
        //TODO:
        break;
    }

    //Next filter by alert severity filter
    if (selectedSeverity !== "all") {
      filteredContacts = filteredContacts.filter((contact) => {
        //we can return early here since the contact doesn't have
        //any alerts
        if (contact.alerts.length === 0) return false;
        return contact.alerts.some(
          (alert) => alert.errorSeverity === selectedSeverity
        );
      });
    }
    return filteredContacts;
  }

  function updateSegment(event) {
    setSelectedSegment(event.detail);
  }

  function updateSeverityFilter(event) {
    setSelectedSeverity(event.target.value);
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
        data-testid="global-status-bar"
        className="mb-3 w-full"
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
            notifications={filterByErrorSeverity(contacts, alertStates).length}
          />
          <RuxMonitoringIcon
            icon="antenna"
            label="Critical"
            status="critical"
            notifications={
              filterByErrorSeverity(contacts, criticalStates).length
            }
          />
        </div>
      </RuxGlobalStatusBar>
      <RuxContainer className="max-w-7xl mx-auto">
        <div slot="header" className="flex">
          <div className="w-1/3">
            <RuxSelect onRuxchange={(event) => updateSeverityFilter(event)}>
              <RuxOption label="all" value={"all"}>
                All
              </RuxOption>
              {errorSeverities.map((severity, index) => (
                <RuxOption
                  key={"severity-" + index}
                  selected=""
                  value={severity}
                  label={severity}
                ></RuxOption>
              ))}
            </RuxSelect>
          </div>
          <div className="w-1/3"></div>
          <div className="w-1/3 text-right">
            <RuxSegmentedButton
              data-testid="segmented-button"
              onRuxchange={(event) => updateSegment(event)}
              data={segmentOptions}
            />
          </div>
        </div>
        <ContactsTable contacts={filteredContacts()} />
      </RuxContainer>
    </>
  );
}

export default App;
