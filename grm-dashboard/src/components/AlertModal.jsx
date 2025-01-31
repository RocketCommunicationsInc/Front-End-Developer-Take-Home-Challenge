import { RuxDialog } from "@astrouxds/react";
import PropTypes from "prop-types";
import { formatDateTime } from "../helpers/formatTime";

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
          <div className="alert-meta flex justify-between">
            <div className="contact-name text-sm">{contact.contactName}</div>
            <div className="severity text-sm">{alert.errorSeverity}</div>
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
              <span>{contact.contactName}</span>
              <span>{contact.contactDetail}</span>
            </div>
          </div>
        </div>
      </RuxDialog>
    </>
  );
}
export default AlertModal;
