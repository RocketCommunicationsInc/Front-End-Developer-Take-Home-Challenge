import React, { useState } from 'react';
import { DashboardComponentWrapper } from './DashboardComponent.styled';
import { fetchData } from '../../services/fake-http-dashboard.service';

import DashboardTableRowComponent from '../DashboardTableRowComponent/DashboardTableRowComponent';
import AlertDetailsModalComponent from '../AlertDetailsModalComponent/AlertDetailsModalComponent';

const DashboardComponent = () => {
   /* Fake endpoint call to fetch and cache all data */
   const [data, setData] = useState(fetchData())

   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedAlert, setSelectedAlert] = useState(null);

   const getAlerts = () => {
      return Object.values(data)
        .flat()
        .sort((a, b) => b.contactStartTime - a.contactStartTime);
   }

   // Function to open the modal and set selected alert data
   const handleOpenModal = (alert) => {
      setSelectedAlert(alert);
      setIsModalOpen(true);
   };

   // Function to close the modal
   const handleCloseModal = () => {
      setIsModalOpen(false);
      setSelectedAlert(null);
   };

   // Function to acknowledge alert
   const handleAcknowledge = (item) => {
      const newData = { ...data };
      for (const alert of newData[item.id]) {
         if (alert.id === item.id) {
            alert.acknowledged = true;
            break;
         }
      }
      setData(newData);
      handleCloseModal();
   };

   return (
      <DashboardComponentWrapper data-testid="DashboardComponent">
         <rux-table theme="dark">
            <rux-table-header>
               <rux-table-header-row>
                  <rux-table-header-cell>Alert Message</rux-table-header-cell>
                  <rux-table-header-cell>Contact Name</rux-table-header-cell>
                  <rux-table-header-cell>Contact Time</rux-table-header-cell>
                  <rux-table-header-cell>Actions</rux-table-header-cell>
               </rux-table-header-row>
            </rux-table-header>
            <rux-table-body>
               {getAlerts().map((item, index) => (
                  <DashboardTableRowComponent
                     key={index}
                     alert={item}
                     handleOpenModal={handleOpenModal}/>
               ))}
            </rux-table-body>
         </rux-table>

         <AlertDetailsModalComponent isOpen={isModalOpen} alert={selectedAlert} handleCloseModal={handleCloseModal} handleAcknowledge={handleAcknowledge}/>
      </DashboardComponentWrapper>
   );
};

export default DashboardComponent;
