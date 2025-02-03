import React, { useState } from "react";
import { DashboardComponentWrapper } from "./DashboardComponent.styled";

/* Fake endpoint call to fetch and cache all data */
import { fetchData } from "../../services/fake-http-dashboard.service";

import {
   RuxTable,
   RuxTableHeader,
   RuxTableHeaderRow,
   RuxTableHeaderCell,
   RuxTableBody,
   RuxCard,
   RuxContainer
} from "@astrouxds/react";
import { statusOptions, severityOptions } from '../../shared';
import DashboardTableFilterComponent from "../DashboardTableFilterComponent/DashboardTableFilterComponent";
import DashboardTableRowComponent from "../DashboardTableRowComponent/DashboardTableRowComponent";
import AlertDetailsModalComponent from "../AlertDetailsModalComponent/AlertDetailsModalComponent";

const DashboardComponent = () => {
   
   const [data, setData] = useState(fetchData())
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedAlert, setSelectedAlert] = useState(null);

   const getAlerts = () => {
      // Retrieves alerts based on initial data sorted by timestamp DESC
      return Object.values(data)
        .flat()
        .sort((a, b) => b.contactStartTime - a.contactStartTime);
   }
   const [alerts, setAlerts] = useState(getAlerts());

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
   const handleAcknowledge = (id) => {
      const newData = { ...data };
      for (const alert of newData[id]) {
         if (alert.id === id) {
            alert.acknowledged = true;
            break;
         }
      }
      setData({...newData, [id]: newData[id]});

      // WORKAROUND: Update current alerts array (preserves existing filtered settings)
      // TODO: Find more performant solution
      const newAlerts = [...alerts];
      for (const alert of newAlerts) {
         if (alert.id === id) {
            alert.acknowledged = true;
            break;
         }
      };
      setAlerts([...newAlerts]);

      handleCloseModal();
   };

   const handleFilterChange = (filterChange) => {
      const filtered = getAlerts().filter((alert) => {
         let include = true;
         if (filterChange.status) {
            include = filterByStatus(filterChange, alert);
         }
         if (include && filterChange.severity) {
            include = filterBySeverity(filterChange, alert);
         }
         if (include && filterChange.contactName) {
            include = filterbyContactName(filterChange, alert);
         }
         return include;
      })
      setAlerts(filtered);
   }

   const filterByStatus = (change, alert) => (
      change.status === statusOptions.all
      || (change.status === statusOptions.acknowledged && alert.acknowledged)
      || (change.status === statusOptions.unacknowledged && !alert.acknowledged)
   );

   const filterBySeverity = (change, alert) => (
      change.severity === severityOptions.all
      || alert.errorSeverity === change.severity.toLowerCase()
   );

   const filterbyContactName = (change, alert) => (
      change.contactName === ""
      || (change.contactName?.length && alert.contactName.includes(change.contactName))
   );

   return (
      <DashboardComponentWrapper theme="dark" data-testid="DashboardComponent">
         <RuxCard>
            <h1 style={{ paddingLeft: "4px" }}>2025 React Astro Dashboard Challenge</h1>
         </RuxCard>
         <RuxContainer>
            <div slot="header">Contact Alert Table</div>
            <div slot="toolbar">
               <DashboardTableFilterComponent handleFilterChange={handleFilterChange}/>
            </div>
            <RuxTable>
               <RuxTableHeader>
                  <RuxTableHeaderRow>
                     <RuxTableHeaderCell>Status</RuxTableHeaderCell>
                     <RuxTableHeaderCell>Alert Message</RuxTableHeaderCell>
                     <RuxTableHeaderCell>Severity</RuxTableHeaderCell>
                     <RuxTableHeaderCell>Contact Name</RuxTableHeaderCell>
                     <RuxTableHeaderCell>Contact Time</RuxTableHeaderCell>
                     <RuxTableHeaderCell></RuxTableHeaderCell>
                  </RuxTableHeaderRow>
               </RuxTableHeader>
               <RuxTableBody>
                  {alerts.map((item, index) => (
                     <DashboardTableRowComponent
                        key={index}
                        alert={item}
                        handleOpenModal={handleOpenModal}/>
                  ))}
               </RuxTableBody>
            </RuxTable>

            <AlertDetailsModalComponent
               isOpen={isModalOpen}
               alert={selectedAlert}
               handleCloseModal={handleCloseModal}
               handleAcknowledge={handleAcknowledge}/>
         </RuxContainer>
      </DashboardComponentWrapper>
   );
};

export default DashboardComponent;
