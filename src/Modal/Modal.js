import React from 'react'
import { RuxModal } from '@astrouxds/react'
import './Modal.css'

const Modal = ({ isOpen, toggleModal }) => {
    return (
        <RuxModal
            confirm-text=""
            deny-text="Close"
            modalMessage="data"
            modal-Title="Details"
            open={isOpen}
            onRuxmodalclosed={(e) => toggleModal()}
        ></RuxModal>
    )
}

export default Modal
