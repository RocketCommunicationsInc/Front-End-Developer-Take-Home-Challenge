import React, { useState } from 'react';
import { DashboardComponentWrapper } from './DashboardComponent.styled';
import { Card, Table, TableHead, TableBody, TableRow, TableCell } from "@pingux/astro";
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
      setIsModalOpen(false);
      setSelectedAlert(null);
   };

   // Function to acknowledge alert
   const handleAcknowledge = (item) => {
      const newData = { ...data };
      console.log('JLL_DEBUG what is item????', item)
      for (const alert of newData[item.id]) {
         if (alert.id === item.id) {
            alert.acknowledged = true;
            console.log('JLL_DEBUG setting acknowledged true!!')
            break;
         }
      }
      setData(newData);
      handleCloseModal();
   };

   return (
      <DashboardComponentWrapper data-testid="DashboardComponent">
         <Card></Card>
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
                     handleOpenModal={handleOpenModal}/>
               ))}
            </TableBody>
         </Table>

         <AlertDetailsModalComponent isOpen={isModalOpen} alert={selectedAlert} handleCloseModal={handleCloseModal} handleAcknowledge={handleAcknowledge}/>
      </DashboardComponentWrapper>
   );
};

export default DashboardComponent;
