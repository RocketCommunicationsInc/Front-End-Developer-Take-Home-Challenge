import React, { useState } from 'react';
import { DashboardComponentWrapper } from './DashboardComponent.styled';
import { Table, TableHead, TableBody, TableRow, TableCell, Button } from "@pingux/astro";
import { fetchData } from '../../services/fake-http-dashboard.service';
import AlertDetailsModalComponent from '../AlertDetailsModalComponent/AlertDetailsModalComponent';

const DashboardComponent = () => {
   /* Fake endpoint call to fetch and cache all data */
   const allData = fetchData();
   const initialState = Object.values(allData).flat();

   const [alerts, setAlerts] = useState([ ...initialState ]);

   //console.log('JLL_DEBUG what is alerts????', alerts)

   return (
      <DashboardComponentWrapper data-testid="DashboardComponent">
         {/* Button to Open Modal JLL_TODO relocate out to ListView item scope -- should be part of the DashboardListItemComponent !!*/}
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
               {alerts.map((item, index) => (
                  <TableRow key={index}>
                     <TableCell>{item.errorMessage}</TableCell>
                     <TableCell>{item.contactName.toString()}</TableCell>
                     <TableCell>{item.contactTime.toString()}</TableCell>
                     <TableCell>
                        <Button onPress={() => (
                           <AlertDetailsModalComponent
                             isOpen={true}
                             contactSatellite={item.contactSatellite}
                             contactDetail={item.contactDetail}/>
                        )}>
                           Show Details
                        </Button>
                        <Button onPress={() => setAlerts({ ...item, acknowledged: true })}>Acknowledge</Button>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </DashboardComponentWrapper>
   );
};

export default DashboardComponent;
