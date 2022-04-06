import { RuxModal } from '@astrouxds/react'

export const Modal = (detail) => {
    const { isOpen, modalTitle, modalMessage } = detail.data;

    return (
        <RuxModal open={isOpen} modal-title={modalTitle} modal-message={modalMessage} confirm-text="OK" deny-text=""></RuxModal>
    )
}

