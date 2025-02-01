import React, { useState } from 'react';
import { AlertDetailsModalComponentWrapper } from './AlertDetailsAlertDetailsModalComponent.styled';

const AlertDetailsModalComponent = () => {
   const [isOpen, setIsOpen] = useState(false); {/* Relocate to DashboardListItemComponent */}

   return (
      <AlertDetailsModalComponentWrapper>
         {/* Button to Open Modal JLL_TODO relocate out to ListView item scope -- should be part of the DashboardListItemComponent !!*/}
         <rux-modal onClick={() => setIsOpen(true)}>Show Details</rux-modal>
 
         {/* Astro Rux-Modal */}
         <rux-modal open={isOpen} onRuxmodalclosed={() => setIsOpen(false)}>
            <div slot="header">Alert Details</div>
            <div slot="message">
               <p><strong>Contact Satellite:</strong> {contactSatellite}</p>
               <p><strong>Contact Detail:</strong> {contactDetail}</p>
            </div>
            {/* JLL_TODO use astro lib button instead??? */}
            <rux-button slot="confirm" onClick={() => setIsOpen(false)}>Close</rux-button>
         </rux-modal>
      </AlertDetailsModalComponentWrapper>
   );
};

export default AlertDetailsModalComponent;
