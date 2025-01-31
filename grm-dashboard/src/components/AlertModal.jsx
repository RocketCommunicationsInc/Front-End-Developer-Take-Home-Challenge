import { RuxDialog } from "@astrouxds/react";
import PropTypes from "prop-types";
import { formatDateTime, contactTimeForHumans } from "../helpers/formatTime";

AlertModal.propTypes = {
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  alert: PropTypes.object,
  contact: PropTypes.object,
};

function AlertModal({ isOpen, closeModal, alert, contact }) {
  return (
    <>
      <RuxDialog
        onRuxdialogclosed={closeModal}
        open={isOpen}
        header={alert.errorMessage}
        confirmText="Acknowledge"
      >
        <div slot="header" className="modal-header w-full text-left">
          <h2 className="mb-2">{alert.errorMessage}</h2>
          <div className="alert-meta flex justify-between content-end">
            <div className="contact-name text-sm self-end">
              Contact Name: {contact.contactName}
            </div>
            <div className="severity text-sm">
              {alert.errorSeverity} <br /> {alert.errorCategory}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 mb-2 pb-2">
          <div className="alert-meta pb-4 mb-4 border-b border-slate-400">
            <h3 className="font-bold">Error details:</h3>
            <p className="mb-2 text-2xl">{alert.longMessage}</p>
            <span className="text-sm">{formatDateTime(alert.errorTime)}</span>
          </div>
          <div className="contact-meta">
            <h3 className="font-bold text-lg">Contact details:</h3>
            <div className="flex flex-col gap-1">
              <span>{contact.contactDetail}</span>
            </div>
            <div className="flex flex-row justify-between italic text-xs pt-3">
              <span>Lat: {contact.contactLatitude}</span>
              <span>Long: {contact.contactLongitude}</span>
              <span>
                Contact Time:{" "}
                {contactTimeForHumans(
                  contact.contactBeginTimestamp,
                  contact.contactEndTimestamp
                )}
              </span>
            </div>
          </div>
        </div>
      </RuxDialog>
    </>
  );
}
export default AlertModal;
