import React, { useState } from 'react';
import { DashboardComponentWrapper } from './DashboardComponent.styled';
import { Table, TableHead, TableBody, TableRow, TableCell } from "@pingux/astro";
import { fetchData } from '../../services/fake-http-dashboard.service';

import DashboardTableRowComponent from '../DashboardTableRowComponent/DashboardTableRowComponent';
import AlertDetailsModalComponent from '../AlertDetailsModalComponent/AlertDetailsModalComponent';

const DashboardComponent = () => {
   /* Fake endpoint call to fetch and cache all data */
   const [data, setData] = useState(fetchData())

   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedAlert, setSelectedAlert] = useState(null);

   const getAlerts = () => {
      return Object.values(data).flat();
   }

   // Function to open the modal and set selected alert data
   const handleOpenModal = (alert) => {
      setSelectedAlert(alert);
      setIsModalOpen(true);
   };

   // Function to close the modal
   const handleCloseModal = () => {
      console.log('JLL_DEBUG coming in here to handle close modal!!!!!!!!!!!!!!')
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
   };

   return (
      <DashboardComponentWrapper data-testid="DashboardComponent">
         <Table>
            <TableHead>
            <TableRow>
               <TableCell>Alert Message</TableCell>
               <TableCell>Contact Name</TableCell>
               <TableCell>Contact Time</TableCell>
               <TableCell>Actions</TableCell>
            </TableRow>
            </TableHead>
            
            <TableBody>
               {getAlerts().map((item, index) => (
                  <DashboardTableRowComponent
                     key={index}
                     alert={item}
                     handleOpenModal={handleOpenModal}
                     handleAcknowledge={handleAcknowledge}/>
               ))}
            </TableBody>
         </Table>

         <AlertDetailsModalComponent isOpen={isModalOpen} alert={selectedAlert} onClose={handleCloseModal} />
      </DashboardComponentWrapper>
   );
};

export default DashboardComponent;
