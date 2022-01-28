import { RuxModal } from "@astrouxds/react";

const Modal = (props) => {
    const { openModal, setOpenModal, data } = props; 
    let satellite = `Satellite: ${data.contactSatellite}`;
    let details = data.contactDetail; 

        return (
                <RuxModal
                        open={openModal}
                        onRuxmodalclosed={() => setOpenModal(false)}
                        confirmText='OK'
                        denyText=''
                        modalTitle={satellite}
                        modalMessage={details}
                    />
        )
}

export default Modal; 