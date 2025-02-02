import {
  RuxButton,
  RuxStatus,
  RuxTable,
  RuxTableBody,
  RuxTableCell,
  RuxTableHeader,
  RuxTableHeaderCell,
  RuxTableHeaderRow,
  RuxTableRow,
  RuxTag,
} from "@astrouxds/react";
import { useAppContext } from "../../providers/AppProvider";

function AlertTable({ filteredAlerts, setSelectedAlert }) {
  const { state } = useAppContext() as any;
  const { acknowledgedIds } = state;

  const handleViewDetailsClick = (alert: any) => {
    setSelectedAlert(alert);
  };

  const validSeverity = [
    "caution",
    "critical",
    "normal",
    "off",
    "serious",
    "standby",
  ];

  return (
    <div className="alert-table-wrap">
      <RuxTable>
        <RuxTableHeader className="alert-table-header">
          <RuxTableHeaderRow>
            <RuxTableHeaderCell>Severity</RuxTableHeaderCell>
            <RuxTableHeaderCell>Acknowledged</RuxTableHeaderCell>
            <RuxTableHeaderCell>Error Message</RuxTableHeaderCell>
            <RuxTableHeaderCell>Contact Name</RuxTableHeaderCell>
            <RuxTableHeaderCell>Contact Time</RuxTableHeaderCell>
            <RuxTableHeaderCell>Alert Details</RuxTableHeaderCell>
          </RuxTableHeaderRow>
        </RuxTableHeader>
        <RuxTableBody>
          {filteredAlerts.map((alert: any) => (
            <RuxTableRow key={alert.id}>
              <RuxTableCell>
                <div className="status-wrap">
                  <RuxStatus
                    status={
                      validSeverity.includes(alert.errorSeverity)
                        ? alert.errorSeverity
                        : "off"
                    }
                  />
                </div>
              </RuxTableCell>
              <RuxTableCell>
                {acknowledgedIds.includes(alert.id) ? (
                  <RuxTag className="tag--acknowledged">ACKN</RuxTag>
                ) : (
                  <RuxTag status="unknown">UNACKN</RuxTag>
                )}
              </RuxTableCell>
              <RuxTableCell>{alert.errorMessage}</RuxTableCell>
              <RuxTableCell>{alert.contact.contactName}</RuxTableCell>
              <RuxTableCell>
                {new Date(alert.contact.contactBeginTimestamp)
                  .toTimeString()
                  .slice(0, 8)}
                {" - "}
                {new Date(alert.contact.contactBeginTimestamp)
                  .toTimeString()
                  .slice(0, 8)}{" "}
              </RuxTableCell>
              <RuxTableCell>
                <div className="py-3">
                  <RuxButton
                    secondary
                    onClick={() => handleViewDetailsClick(alert)}
                  >
                    Show Details
                  </RuxButton>
                </div>
              </RuxTableCell>
            </RuxTableRow>
          ))}
        </RuxTableBody>
      </RuxTable>
    </div>
  );
}

export default AlertTable;
