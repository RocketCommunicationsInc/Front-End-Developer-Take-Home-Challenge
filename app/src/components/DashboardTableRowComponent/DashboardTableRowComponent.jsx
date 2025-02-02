import React from "react";
import { TableRow, TableCell, Button } from "@pingux/astro";

const DashboardTableRowComponent = ({ alert, handleOpenModal, handleAcknowledge }) => {
    //console.log('JLL_DEBUG props for table row componenet are....', alert, index)
    return (
        <TableRow>
            <TableCell>{alert.errorMessage}</TableCell>
            <TableCell>{alert.contactName}</TableCell>
            <TableCell>{alert.contactTime}</TableCell>
            <TableCell>
               <Button onPress={() => handleOpenModal(alert)}>Show Details</Button>
               <Button onPress={() => handleAcknowledge(alert)}>Acknowledge</Button>
            </TableCell>
        </TableRow>
    );
};

export default DashboardTableRowComponent;