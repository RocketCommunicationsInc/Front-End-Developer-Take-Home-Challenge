import { RuxTableCell  } from "@astrouxds/react";

const TableCell = (data) => {
    return (
        <>
            <RuxTableCell>{data.data.contactName}</RuxTableCell>
            <RuxTableCell>{data.data.contactGround}</RuxTableCell>
            <RuxTableCell>{data.data.contactEndTimestamp - data.data.contactBeginTimestamp}</RuxTableCell>
            <RuxTableCell>{data.data.contactStatus[0].toUpperCase() + data.data.contactStatus.substring(1)}</RuxTableCell>
            <RuxTableCell>{data.data.contactState[0].toUpperCase() + data.data.contactState.substring(1)}</RuxTableCell>
            <RuxTableCell>{data.data.contactStep}</RuxTableCell>
            <RuxTableCell>{data.data.alerts[0].errorMessage}</RuxTableCell>
            <RuxTableCell>{data.data.alerts[0].errorCategory[0].toUpperCase() + data.data.alerts[0].errorCategory.substring(1)}</RuxTableCell>
            <RuxTableCell>{data.data.alerts[0].errorSeverity[0].toUpperCase() + data.data.alerts[0].errorSeverity.substring(1)}</RuxTableCell>
        </>
    )
}

export default TableCell; 