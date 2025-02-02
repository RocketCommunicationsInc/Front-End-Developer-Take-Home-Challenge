import {
  RuxButton,
  RuxContainer,
  RuxDialog,
  RuxTable,
  RuxTableBody,
  RuxTableCell,
  RuxTableHeader,
  RuxTableHeaderCell,
  RuxTableHeaderRow,
  RuxTableRow,
} from "@astrouxds/react";
import { useAppContext } from "../../providers/AppProvider";

import "/src/css/components/AlertList/AlertList.css";

import type { Status } from "@astrouxds/astro-web-components";
import { useMemo, useState } from "react";
import AlertHero from "./AlertHero";
import AlertTable from "./AlertTable";

function AlertList() {
  const { state, dispatch } = useAppContext() as any;
  const { contacts, acknowledgedIds } = state;

  const [severitySelection, setSeveritySelection] = useState<Status | "all">(
    "all",
  );
  const [selectedAlert, setSelectedAlert] = useState<any>(null);

  const alertsArray = useMemo(
    () =>
      contacts
        .flatMap((contact) =>
          contact.alerts.map((alert, i: number) => ({
            ...alert,
            id: `${contact._id}-${alert.errorId}-${i}`,
            contact: contact,
          })),
        )
        .sort((a, b) => a.errorTime - b.errorTime),
    [contacts],
  );

  const filteredAlerts = useMemo(() => {
    return severitySelection !== "all"
      ? alertsArray.filter(
          (alert: any) => alert.errorSeverity === severitySelection,
        )
      : alertsArray;
  }, [severitySelection, alertsArray]);

  const handleCloseDialog = () => {
    setSelectedAlert(null);
  };

  const handleAcknowledgeAlert = () => {
    setSelectedAlert(null);
    dispatch({
      type: "SET_ACKNOWLEDGED_IDS",
      payload: [...acknowledgedIds, selectedAlert.id],
    });
  };

  return (
    <>
      <main className="dashboard__main">
        <RuxContainer className="alert-container">
          <div slot="header">
            <span>Active Alerts</span>
          </div>
          <AlertHero
            alertLength={alertsArray.length}
            acknowledgedLength={acknowledgedIds.length}
            setSeveritySelection={setSeveritySelection}
          />
          <AlertTable
            filteredAlerts={filteredAlerts}
            setSelectedAlert={setSelectedAlert}
          />
        </RuxContainer>
      </main>

      <RuxDialog open={!!selectedAlert} id="contact-details">
        <div slot="header">Alert Details</div>
        {selectedAlert ? (
          <RuxTable>
            <RuxTableHeader>
              <RuxTableHeaderRow>
                <RuxTableHeaderCell>Contact Satellite</RuxTableHeaderCell>
                <RuxTableHeaderCell>Error Message</RuxTableHeaderCell>
              </RuxTableHeaderRow>
            </RuxTableHeader>
            <RuxTableBody>
              <RuxTableRow>
                <RuxTableCell>
                  {selectedAlert.contact.contactSatellite}
                </RuxTableCell>
                <RuxTableCell>{selectedAlert.errorMessage}</RuxTableCell>
              </RuxTableRow>
            </RuxTableBody>
          </RuxTable>
        ) : (
          <h1>No Current Alert</h1>
        )}
        <div className="dialog-footer" slot="footer">
          <RuxButton
            disabled={
              acknowledgedIds.includes(selectedAlert?.id) ? true : false
            }
            onClick={handleAcknowledgeAlert}
          >
            Acknowledge Alert
          </RuxButton>
          <RuxButton onClick={handleCloseDialog} secondary>
            Dismiss
          </RuxButton>
        </div>
      </RuxDialog>
    </>
  );
}

export default AlertList;
