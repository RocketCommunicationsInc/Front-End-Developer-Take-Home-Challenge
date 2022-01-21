import { RuxModal, } from "@astrouxds/react";

const Modal = (props) => {
    const { modalOpen, setModalOpen, modalData } = props;
    // if modalOpen is true, return modal component
    if (modalOpen) {
        const contactName = `Contact Satellite: ${modalData.contactSatellite}`
        const contactDetails = `Contact Details: ${modalData.contactDetail}`
        return <RuxModal
            open={modalOpen}
            onRuxmodalclosed={() => setModalOpen(null)}
            confirmText="close" denyText=""
            modalTitle={contactName}
            modalMessage={contactDetails} />
    }
    // otherwise, return nothing
    return null;
}

export default Modal;