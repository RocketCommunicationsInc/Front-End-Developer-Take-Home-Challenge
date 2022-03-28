import React from 'react'
import { RuxModal } from '@astrouxds/react'
import './Modal.css'

const Modal = ({ isOpen, toggleModal }) => {
    return (
        <div className="modal-container">
            <RuxModal
                confirm-text=""
                deny-text="Close"
                modalMessage="help"
                modal-Title="Details"
                open={isOpen}
                onRuxmodalclosed={(e) => toggleModal()}
            ></RuxModal>
        </div>
    )
}

export default Modal
