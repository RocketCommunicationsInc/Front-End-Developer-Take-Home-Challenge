import React from "react";
import { DashboardTableRowButtonWrapper } from './DashboardTableRowComponent.styled'

const DashboardTableRowComponent = ({ alert, handleOpenModal }) => {
    const startTime = new Date(alert.contactStartTime * 1000).toLocaleString();
    const endTime = new Date(alert.contactEndTime * 1000).toLocaleString();

    return (
        <rux-table-row theme="dark">
            <rux-table-cell>{alert.errorMessage}</rux-table-cell>
            <rux-table-cell>{alert.contactName}</rux-table-cell>
            <rux-table-cell>{startTime} - {endTime}</rux-table-cell>
            <rux-table-cell>
                <DashboardTableRowButtonWrapper>
                    <rux-button onClick={() => handleOpenModal(alert)}>Show Details</rux-button>
                </DashboardTableRowButtonWrapper>
            </rux-table-cell>
        </rux-table-row>
    );
};

export default DashboardTableRowComponent;