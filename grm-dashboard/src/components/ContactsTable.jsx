import {
  RuxTable,
  RuxTableHeader,
  RuxTableHeaderRow,
  RuxTableHeaderCell,
  RuxTableBody,
  RuxTableRow,
  RuxTableCell,
  RuxButton,
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
    { label: "", id: "actions" },
  ];

  return (
    <>
      <RuxTable>
        <RuxTableHeader>
          <RuxTableHeaderRow>
            {headerCols.map((col) => (
              <RuxTableHeaderCell key={col.id} className="p-2">
                {col.label}
              </RuxTableHeaderCell>
            ))}
          </RuxTableHeaderRow>
        </RuxTableHeader>
        <RuxTableBody>
          {contacts.map((contact) => (
            <RuxTableRow key={contact._id}>
              <RuxTableCell>{contact.contactName}</RuxTableCell>
              <RuxTableCell>{contact.contactStatus}</RuxTableCell>
              <RuxTableCell>
                {(contact.contactEndTimestamp = contact.contactBeginTimestamp)}
              </RuxTableCell>
              <RuxTableCell>{contact.alerts.length}</RuxTableCell>
              <RuxTableCell>
                <RuxButton>Show</RuxButton>
              </RuxTableCell>
            </RuxTableRow>
          ))}
        </RuxTableBody>
      </RuxTable>
    </>
  );
}

export default ContactsTable;
