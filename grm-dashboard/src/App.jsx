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
import AlertModal from "./components/AlertModal";
import "./App.css";
import contactsJson from "../../data.json";

function App() {
  const appName = "GRM Dashboard";
  const appVersion = "1.0";
  const menuIcon = "antenna-receive";
  const [contacts, setContacts] = useState(contactsJson);
  const [segmentOptions, setSegmentOptions] = useState([
    { label: "All" },
    { label: "Only Alerts", selected: true },
    { label: "Unacknowledged" },
  ]);
  const [selectedSegment, setSelectedSegment] = useState("Only Alerts");
  const [errorSeverities, setErrorSeverities] = useState([]);
  const [selectedSeverity, setSelectedSeverity] = useState("all");

  //Interesting problem here, we need to set a selected alert
  //and a selected contact because we lose track of the contact
  //if we isolate the alert and we can't reliably identify an alert
  //from a contact (several alerts share the same ID, severity, timestamp)
  //So we will track them both to display relevant data in the modal
  const [selectedAlert, setSelectedAlert] = useState({});
  const [selectedContact, setSelectedContact] = useState({});

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    //Here we may want to query the API for the contact data
    //instead of loading it from a file.
    //TODO: Consider merits of caching data and tolerance for stale data

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

    //Next we want to sort the nested alerts by their date
    contacts.map((contact) => {
      if (contact.alerts.length) {
        contact.alerts = contact.alerts?.sort(
          (a, b) => b.errorTime - a.errorTime
        );
      }
    });

    //Finally, we want to sort all the contacts by their most recent alert
    //Note: this will put alerts at the top of the list when segmented by "all"
    contacts.sort((a, b) => {
      if (!b.alerts.length) return -1;
      if (!a.alerts.length) return 1;
      return b.alerts[0].errorTime - a.alerts[0].errorTime;
    });

    setContacts(contacts);
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
        filteredContacts = filterByErrorSeverity(contacts, errorSeverities);
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

  function openModal(contact, alert) {
    console.log(contact);
    setSelectedContact(contact);
    setSelectedAlert(alert);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
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
        <div slot="right-side" className="w-md flex justify-between pr-3 gap-5">
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
            label="Serious"
            status="serious"
            notifications={filterByErrorSeverity(contacts, ["serious"]).length}
          />
          <RuxMonitoringIcon
            icon="antenna"
            label="Critical"
            status="critical"
            notifications={filterByErrorSeverity(contacts, ["critical"]).length}
          />
        </div>
      </RuxGlobalStatusBar>
      <AlertModal
        isOpen={modalOpen}
        closeModal={closeModal}
        alert={selectedAlert}
        contact={selectedContact}
      />
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
          <div className="w-1/3 text-center">
            {filteredContacts().length} Results
          </div>
          <div className="w-1/3 text-right">
            <RuxSegmentedButton
              data-testid="segmented-button"
              onRuxchange={(event) => updateSegment(event)}
              data={segmentOptions}
            />
          </div>
        </div>
        <ContactsTable contacts={filteredContacts()} openModal={openModal} />
      </RuxContainer>
    </>
  );
}

export default App;
