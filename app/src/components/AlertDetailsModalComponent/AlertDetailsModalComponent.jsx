import React, { useState } from 'react';
import { AlertDetailsModalComponentWrapper } from './AlertDetailsAlertDetailsModalComponent.styled';

const AlertDetailsModalComponent = () => {
   const [isOpen, setIsOpen] = useState(false);

   return (
      <AlertDetailsModalComponentWrapper>
         {/* Button to Open Modal */}
         <rux-modal onClick={() => setIsOpen(true)}>Show Error</rux-modal>
 
         {/* Astro Rux-Modal */}
         <rux-modal open={isOpen} onRuxmodalclosed={() => setIsOpen(false)}>
            <div slot="header">Error Details</div>
            <div slot="message">
               <p><strong>Contact:</strong> {contactName}</p>
               <p><strong>Timestamp:</strong> {new Date(timestamp).toLocaleString()}</p>
               <p><strong>Message:</strong> {errorMessage}</p>
            </div>
            <rux-button slot="confirm" onClick={() => setIsOpen(false)}>Close</rux-button>
         </rux-modal>
      </AlertDetailsModalComponentWrapper>
   );
};

export default AlertDetailsModalComponent;
