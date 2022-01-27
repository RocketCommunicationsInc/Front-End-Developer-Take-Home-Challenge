import { RuxModal } from "@astrouxds/react";

const AlertDetails = (props) => {
    if(props.modalOpen) {
        return (
            <RuxModal
                open={props.modalOpen}
                onRuxmodalclosed={() => props.setModalOpen(null)}
                confirmText="OK"
                denyText=""
                modalTitle={props.contactName}
                modalMessage={props.contactDetails}
            />
        )
    }
    return null; 
}

export default AlertDetails; 