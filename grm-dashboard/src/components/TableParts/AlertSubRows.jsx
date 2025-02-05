import {
  RuxTableRow,
  RuxTableCell,
  RuxButton,
  RuxStatus,
  RuxIcon,
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
        <RuxTableRow
          key={alert + index}
          className={`alert-row bg-cyan-950 ${
            alert.acknowledged ? "acknowledged" : ""
          }`}
        >
          <RuxTableCell></RuxTableCell>
          <RuxTableCell className="pl-2">{alert.errorMessage}</RuxTableCell>
          <RuxTableCell>{alert.errorSeverity}</RuxTableCell>
          <RuxTableCell>{formatDateTime(alert.errorTime)}</RuxTableCell>
          <RuxTableCell>
            {alert.acknowledged ? (
              <RuxIcon icon="done" size="extra-small" />
            ) : (
              <RuxStatus status={sanitizeErrorSeverity(alert.errorSeverity)} />
            )}
          </RuxTableCell>
          <RuxTableCell>
            <RuxButton
              disabled={alert.acknowledged}
              onClick={() => openModal(contact, alert)}
            >
              {alert.acknowledged ? "Acknowledged" : "Show Details"}
            </RuxButton>
          </RuxTableCell>
        </RuxTableRow>
      ))}
    </>
  );
}

export default AlertSubRows;
