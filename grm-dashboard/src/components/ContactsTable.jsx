import React, { useImperativeHandle, useState } from "react";
import {
  RuxTable,
  RuxTableHeader,
  RuxTableHeaderRow,
  RuxTableHeaderCell,
  RuxTableBody,
  RuxTableRow,
  RuxTableCell,
  RuxButton,
  RuxStatus,
  RuxIcon,
} from "@astrouxds/react";
import PropTypes from "prop-types";

ContactsTable.propTypes = {
  contacts: PropTypes.array,
};

function ContactsTable({ contacts }) {
  const headerCols = [
    { label: "Contact Name", id: "contactName" },
    { label: "Status", id: "status" },
    { label: "Contact Time", id: "contactTime" },
    { label: "Alerts", id: "numAlerts" },
    { label: "", id: "expand" },
  ];
  const [expandedRows, setExpandedRows] = useState({});

  function toggleRow(contact) {
    if (contact.alerts.length === 0) return;
    setExpandedRows((prev) => ({ ...prev, [contact._id]: !prev[contact._id] }));
  }

  function expandAll() {
    const newExpandedRows = {};
    contacts.map((contact) => {
      if (contact.alerts.length) {
        newExpandedRows[contact._id] = true;
      }
    });
    setExpandedRows(newExpandedRows);
  }
  function collapseAll() {
    setExpandedRows({});
  }

  return (
    <>
      <RuxTable>
        <RuxTableHeader>
          <RuxTableHeaderRow>
            {headerCols.map((col) => (
              <RuxTableHeaderCell key={col.id} className="p-2">
                {col.id === "expand" && (
                  <>
                    {
                      //No true values in our expandedRows
                      Object.values(expandedRows).includes(true) === false ? (
                        <RuxButton onClick={() => expandAll()}>
                          Expand All
                        </RuxButton>
                      ) : (
                        <RuxButton onClick={() => collapseAll()}>
                          Collapse All
                        </RuxButton>
                      )
                    }
                  </>
                )}
                {col.label}
              </RuxTableHeaderCell>
            ))}
          </RuxTableHeaderRow>
        </RuxTableHeader>
        <RuxTableBody>
          {contacts.map((contact) => (
            <React.Fragment key={contact._id}>
              <RuxTableRow onClick={() => toggleRow(contact)}>
                <RuxTableCell className="p-2">
                  {contact.contactName}
                </RuxTableCell>
                <RuxTableCell>{contact.contactStatus}</RuxTableCell>
                <RuxTableCell>
                  {
                    (contact.contactEndTimestamp =
                      contact.contactBeginTimestamp)
                  }
                </RuxTableCell>
                <RuxTableCell className="flex w-full text-center">
                  {contact.alerts.map((alert, index) => (
                    <RuxStatus
                      key={index + alert.errorId}
                      status={alert.errorSeverity}
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
                  <RuxTableRow
                    key={index + alert.errorId}
                    className="alert-row bg-cyan-950"
                  >
                    <RuxTableCell className="pl-2">
                      {alert.errorMessage}
                    </RuxTableCell>
                    <RuxTableCell>{alert.errorSeverity}</RuxTableCell>
                    <RuxTableCell>{alert.errorTime}</RuxTableCell>
                    <RuxTableCell>
                      <RuxStatus status={alert.errorSeverity} />
                    </RuxTableCell>
                    <RuxTableCell>
                      <RuxButton>Show Details</RuxButton>
                    </RuxTableCell>
                  </RuxTableRow>
                ))}
            </React.Fragment>
          ))}
        </RuxTableBody>
      </RuxTable>
    </>
  );
}

export default ContactsTable;
