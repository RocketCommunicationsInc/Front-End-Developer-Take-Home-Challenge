import {
  RuxTableRow,
  RuxTableCell,
  RuxButton,
  RuxStatus,
} from "@astrouxds/react";
import PropTypes from "prop-types";
import { formatDateTime } from "../../helpers/formatTime";

AlertSubRows.propTypes = {
  contact: PropTypes.object,
  sanitizeErrorSeverity: PropTypes.func,
  openModal: PropTypes.func,
};

function AlertSubRows({ contact, sanitizeErrorSeverity, openModal }) {
  return (
    <>
      {contact.alerts.map((alert, index) => (
        <RuxTableRow key={alert + index} className="alert-row bg-cyan-950">
          <RuxTableCell className="pl-2">{alert.errorMessage}</RuxTableCell>
          <RuxTableCell>{alert.errorSeverity}</RuxTableCell>
          <RuxTableCell>{formatDateTime(alert.errorTime)}</RuxTableCell>
          <RuxTableCell>
            <RuxStatus status={sanitizeErrorSeverity(alert.errorSeverity)} />
          </RuxTableCell>
          <RuxTableCell>
            <RuxButton onClick={() => openModal(contact, alert)}>
              Show Details
            </RuxButton>
          </RuxTableCell>
        </RuxTableRow>
      ))}
    </>
  );
}

export default AlertSubRows;
