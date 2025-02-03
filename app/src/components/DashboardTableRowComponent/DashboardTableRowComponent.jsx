import React from "react";
import { DashboardTableRowButtonWrapper } from './DashboardTableRowComponent.styled'
import { RuxIcon, RuxButton, RuxTableRow, RuxTableCell } from '@astrouxds/react'

const DashboardTableRowComponent = ({ alert, handleOpenModal }) => {
    const startTime = new Date(alert.contactStartTime * 1000).toLocaleString();
    const endTime = new Date(alert.contactEndTime * 1000).toLocaleString();

    const icon = alert.acknowledged ? "check-circle" : "cancel";

    return (
        <RuxTableRow theme="dark">
            <RuxTableCell>
                <RuxIcon
                    icon={icon}
                    size="1.5rem"
                    style={{ color: alert.acknowledged ? "rgb(35, 151, 186)" : "orange" }}/>
            </RuxTableCell>
            <RuxTableCell>{alert.errorMessage}</RuxTableCell>
            <RuxTableCell>{alert.errorSeverity}</RuxTableCell>
            <RuxTableCell>{alert.contactName}</RuxTableCell>
            <RuxTableCell>{startTime} - {endTime}</RuxTableCell>
            <RuxTableCell>
                <DashboardTableRowButtonWrapper>
                    <RuxButton size="small" onClick={() => handleOpenModal(alert)}>Show Details</RuxButton>
                </DashboardTableRowButtonWrapper>
            </RuxTableCell>
        </RuxTableRow>
    );
};

export default DashboardTableRowComponent;