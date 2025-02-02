import React, {} from 'react';
import { StyledModalComponentWrapper, StyledModalContent } from './AlertDetailsModalComponent.styled';


const AlertDetailsModalComponent = ({ isOpen, alert, onClose }) => {
   if (!alert) return null; // Prevent rendering when no alert is selected

   return (
      <StyledModalComponentWrapper>
         <StyledModalContent>
            <rux-modal open={isOpen} onRuxmodalclosed={() => onClose()}>
               <h2 slot="header">Alert Details</h2>
               <div slot="message">
                  <p><strong>Contact Satellite:</strong> {alert.contactSatellite}</p>
                  <p><strong>Contact Detail:</strong> {alert.contactDetail}</p>
               </div>
               <rux-button slot="confirm" onClick={() => onClose()}>Close</rux-button>
            </rux-modal>
         </StyledModalContent>
      </StyledModalComponentWrapper>
   );
};

export default AlertDetailsModalComponent;
