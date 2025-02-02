import React, {} from 'react';
import { ModalComponentWrapper, StyledModalContent } from './AlertDetailsModalComponent.styled';


const AlertDetailsModalComponent = ({ isOpen, alert, onClose }) => {
   //console.log('JLL_DEBUG what are the alert details modal props?????', isOpen, alert, onClose)
   if (!alert) return null; // Prevent rendering when no alert is selected

   return (
      <ModalComponentWrapper>
         <StyledModalContent>
            <rux-modal open={isOpen} onRuxmodalclosed={onClose}>
               <h2 slot="header">Alert Details</h2>
               <div slot="message">
                  <p><strong>Contact Satellite:</strong> {alert.contactSatellite}</p>
                  <p><strong>Contact Detail:</strong> {alert.contactDetail}</p>
               </div>
               <rux-button slot="confirm" onPress={onClose}>Close</rux-button>
            </rux-modal>
         </StyledModalContent>
      </ModalComponentWrapper>
   );
};

export default AlertDetailsModalComponent;
