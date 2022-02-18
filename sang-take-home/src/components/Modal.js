import React from 'react';
import { useGlobalContext } from '../context';
import { RuxModal } from '@astrouxds/react';

const Modal = () => {
  const { isModalOpen, closeModal, modalContent } = useGlobalContext();
  const { contactSatellite, contactDetail } = modalContent;
  return (
    <div className="modal">
      {isModalOpen && (
        <RuxModal
          open=""
          modal-title={`${contactSatellite}`}
          modal-message={`${contactDetail}`}
        ></RuxModal>
      )}
    </div>
  );
};

export default Modal;
