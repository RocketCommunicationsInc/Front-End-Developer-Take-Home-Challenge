import React from "react";
import { TableRow, TableCell, Button } from "@pingux/astro";

const DashboardTableRowComponent = ({ alert, handleOpenModal }) => {
    return (
        <TableRow>
            <TableCell>{alert.errorMessage}</TableCell>
            <TableCell>{alert.contactName}</TableCell>
            <TableCell>{alert.contactTime}</TableCell>
            <TableCell>
               <Button onPress={() => handleOpenModal(alert)}>Show Details</Button>
            </TableCell>
        </TableRow>
    );
};

export default DashboardTableRowComponent;