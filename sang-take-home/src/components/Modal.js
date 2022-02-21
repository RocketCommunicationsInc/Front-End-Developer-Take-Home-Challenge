import React from 'react';
import { useGlobalContext } from '../context';
import { RuxModal } from '@astrouxds/react';

const Modal = () => {
  const { isModalOpen, closeModal, modalContent } = useGlobalContext();
  const { contactSatellite, contactDetail } = modalContent;
  return (
    <>
      <RuxModal
        open={isModalOpen}
        modal-title={`${contactSatellite}`}
        modal-message={`${contactDetail}`}
        onRuxmodalclosed={closeModal}
      ></RuxModal>
    </>
  );
};

export default Modal;
