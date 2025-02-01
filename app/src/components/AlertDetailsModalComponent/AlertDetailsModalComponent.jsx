import React, { useState } from 'react';
import { AlertDetailsModalComponentWrapper } from './AlertDetailsModalComponent.styled';


const AlertDetailsModalComponent = (props) => {
   let { isOpen, contactSatellite, contactDetail } = props;
   const [modalState, setModalState] = useState({ isOpen, contactSatellite, contactDetail });

   return (
      <AlertDetailsModalComponentWrapper>
         <rux-modal onPress={() => {
            console.log('JLL_DEBUG clicking show details!!!! Props => ', props)
            setModalState({ ...modalState, isOpen: true })
         }}>Show Details</rux-modal>
 
         {/* Astro Rux-Modal */}
         <rux-modal open={isOpen} onRuxmodalclosed={() => setModalState({ ...modalState, isOpen: false })}>
            <div slot="header">Alert Details</div>
            <div slot="message">
               <p><strong>Contact Satellite:</strong> {contactSatellite}</p>
               <p><strong>Contact Detail:</strong> {contactDetail}</p>
            </div>
            {/* JLL_TODO use astro lib button instead??? */}
            <rux-button slot="confirm" onPress={() => setModalState({ ...modalState, isOpen: false })}>Close</rux-button>
         </rux-modal>
      </AlertDetailsModalComponentWrapper>
   );
};

export default AlertDetailsModalComponent;
