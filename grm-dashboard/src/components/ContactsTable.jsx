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

function ContactsTable({ contacts }) {
  const headerCols = [
    { label: "Contact Name", id: "contactName" },
    { label: "Status", id: "status" },
    { label: "Contact Time", id: "contactTime" },
    { label: "Severity", id: "severity" },
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
      <div>
        {contacts.map((contact) => (
          <span key={contact._id}>{contact.contactName}</span>
        ))}
      </div>
    </>
  );
}

export default ContactsTable;
