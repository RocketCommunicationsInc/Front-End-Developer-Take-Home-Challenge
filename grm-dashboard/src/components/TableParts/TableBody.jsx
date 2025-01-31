import React from "react";
import {
  RuxTableBody,
  RuxTableRow,
  RuxTableCell,
  RuxIcon,
  RuxStatus,
} from "@astrouxds/react";
import PropTypes from "prop-types";
import { contactTimeForHumans } from "../../helpers/formatTime";
import AlertSubRows from "./AlertSubRows";

TableBody.propTypes = {
  contacts: PropTypes.array,
  toggleRow: PropTypes.func,
  expandedRows: PropTypes.object,
  openModal: PropTypes.func,
};

function TableBody({ contacts, toggleRow, expandedRows, openModal }) {
  function sanitizeErrorSeverity(status) {
    const supportedIconStatuses = [
      "off",
      "standby",
      "normal",
      "caution",
      "serious",
      "critical",
    ];
    if (supportedIconStatuses.includes(status)) {
      return status;
    }
    //Here we can map unsupported statuses
    //TODO: get full list that is supplied by the API
    switch (status) {
      case "warning":
        return "caution";
      default:
        return "off";
    }
  }
  return (
    <>
      {contacts.length ? (
        <RuxTableBody>
          {contacts.map((contact) => (
            <React.Fragment key={contact._id}>
              <RuxTableRow
                data-testid="table-row"
                onClick={() => toggleRow(contact)}
              >
                <RuxTableCell className="text-left">
                  {contact.alerts.length ? (
                    <RuxIcon
                      className="mr-4"
                      size="small"
                      icon={
                        expandedRows[contact._id]
                          ? "keyboard-arrow-down"
                          : "keyboard-arrow-right"
                      }
                    />
                  ) : (
                    ""
                  )}
                </RuxTableCell>
                <RuxTableCell className="p-2">
                  {contact.contactName}
                </RuxTableCell>
                <RuxTableCell>{contact.contactStatus}</RuxTableCell>
                <RuxTableCell>
                  {contactTimeForHumans(
                    contact.contactBeginTimestamp,
                    contact.contactEndTimestamp
                  )}
                </RuxTableCell>
                <RuxTableCell className="flex w-full text-center">
                  {contact.alerts.map((alert, index) => (
                    <React.Fragment key={alert.errorId + index}>
                      {alert.acknowledged ? (
                        <RuxIcon icon="done" size="extra-small" />
                      ) : (
                        <RuxStatus
                          key={index + alert.errorId}
                          status={sanitizeErrorSeverity(alert.errorSeverity)}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </RuxTableCell>
                <RuxTableCell></RuxTableCell>
              </RuxTableRow>
              {expandedRows[contact._id] && (
                <AlertSubRows
                  contact={contact}
                  sanitizeErrorSeverity={sanitizeErrorSeverity}
                  openModal={openModal}
                />
              )}
            </React.Fragment>
          ))}
        </RuxTableBody>
      ) : (
        <div className="min-w-3xl p-2 m-2">No Results</div>
      )}
    </>
  );
}

export default TableBody;
