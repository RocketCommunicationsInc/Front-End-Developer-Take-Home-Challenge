import { useState } from "react";
import { RuxTable } from "@astrouxds/react";
import PropTypes from "prop-types";
import TableHeader from "./TableParts/TableHeader";
import TableBody from "./TableParts/TableBody";

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
      <RuxTable className="table-fixed">
        <TableHeader
          cols={headerCols}
          someExpanded={Object.values(expandedRows).includes(true)}
          expandAll={expandAll}
          collapseAll={collapseAll}
        />
        <TableBody
          contacts={contacts}
          toggleRow={toggleRow}
          expandedRows={expandedRows}
        />
      </RuxTable>
    </>
  );
}

export default ContactsTable;
