import React, {} from 'react';
import {
   StyledModalComponentWrapper,
   StyledModalContent,
   StyledModalButtonWrapper,
   StyledModalButtonContainer,
   StyledModalHeader,
} from './AlertDetailsModalComponent.styled';
import {
   RuxIcon,
   RuxButton,
} from "@astrouxds/react";


const AlertDetailsModalComponent = ({ isOpen, alert, handleCloseModal, handleAcknowledge }) => {
   if (!alert) return null; // Prevent rendering when no alert is selected

   const showAcknowledged = () => {
      if (!alert.acknowledged) {
         return (
            <RuxButton onClick={() => handleAcknowledge(alert.id)}>Acknowledge</RuxButton>
         )
      } else {
         return (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
               <RuxIcon icon="check-circle" size="1.5rem" style={{ color: "green" }} />
               <span><strong>Acknowledged</strong></span>
            </div>
         )
      }
   }

   return (
      <StyledModalComponentWrapper>
         <StyledModalContent>
            <rux-modal open={isOpen} onRuxmodalclosed={handleCloseModal}>
               <StyledModalHeader slot="header">
                  <h2>Alert Details</h2>
                  <RuxIcon icon="close" onClick={handleCloseModal} style={{ transform: 'scale(0.8)', cursor: 'pointer' }}></RuxIcon>
               </StyledModalHeader>
               <div slot="message">
                  <p><strong>Category:</strong> {alert.errorCategory}</p>
                  <p><strong>Severity:</strong> {alert.errorSeverity}</p>
                  <p><strong>Contact Name:</strong> {alert.contactName}</p>
                  <p><strong>Contact Satellite:</strong> {alert.contactSatellite}</p>
                  <p><strong>Contact Detail:</strong> {alert.contactDetail}</p>
                  <p><strong>Message:</strong> {alert.longMessage}</p>
               </div>
               <StyledModalButtonWrapper slot="confirm">
                  <StyledModalButtonContainer>
                     {showAcknowledged()}
                  </StyledModalButtonContainer>
               </StyledModalButtonWrapper>
            </rux-modal>
         </StyledModalContent>
      </StyledModalComponentWrapper>
   );
};

export default AlertDetailsModalComponent;
