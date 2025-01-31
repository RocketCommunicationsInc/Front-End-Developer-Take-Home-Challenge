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
import AlertSubRow from "./AlertSubRow";

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
      <RuxTableBody>
        {contacts.map((contact) => (
          <React.Fragment key={contact._id}>
            <RuxTableRow onClick={() => toggleRow(contact)}>
              <RuxTableCell className="p-2">{contact.contactName}</RuxTableCell>
              <RuxTableCell>{contact.contactStatus}</RuxTableCell>
              <RuxTableCell>
                {contactTimeForHumans(
                  contact.contactBeginTimestamp,
                  contact.contactEndTimestamp
                )}
              </RuxTableCell>
              <RuxTableCell className="flex w-full text-center">
                {contact.alerts.map((alert, index) => (
                  <RuxStatus
                    key={index + alert.errorId}
                    status={sanitizeErrorSeverity(alert.errorSeverity)}
                  />
                ))}
              </RuxTableCell>
              <RuxTableCell className="text-right">
                {contact.alerts.length ? (
                  <RuxIcon
                    className="mr-4"
                    size="extra-small"
                    icon={
                      expandedRows[contact._id]
                        ? "keyboard-arrow-down"
                        : "keyboard-arrow-left"
                    }
                  />
                ) : (
                  ""
                )}
              </RuxTableCell>
            </RuxTableRow>
            {expandedRows[contact._id] &&
              contact.alerts.map((alert, index) => (
                //Found some duplicate error IDs in dataset
                //Need to use index in key
                <AlertSubRow
                  key={index + alert.errorId}
                  alert={alert}
                  sanitizeErrorSeverity={sanitizeErrorSeverity}
                  openModal={openModal}
                />
              ))}
          </React.Fragment>
        ))}
      </RuxTableBody>
    </>
  );
}

export default TableBody;
