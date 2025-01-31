import { RuxDialog } from "@astrouxds/react";
import PropTypes from "prop-types";

AlertModal.propTypes = {
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
};

function AlertModal({ isOpen, closeModal }) {
  return (
    <>
      <RuxDialog
        onRuxdialogclosed={closeModal}
        open={isOpen}
        header="Testing Modal"
      />
    </>
  );
}
export default AlertModal;
