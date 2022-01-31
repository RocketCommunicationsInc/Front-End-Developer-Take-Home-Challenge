import { RuxTableCell, RuxStatus  } from "@astrouxds/react";

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
            <RuxTableCell>
                <p className={ data.data.alerts[0].errorSeverity === 'critical' ? 'critical' 
                    : data.data.alerts[0].errorSeverity === 'serious' ? 'serious' 
                    : data.data.alerts[0].errorSeverity === 'caution' ? 'caution' 
                    : null
                }>
                    { data.data.alerts[0].errorSeverity === 'critical' ? <RuxStatus status='critical'></RuxStatus> 
                        : data.data.alerts[0].errorSeverity === 'serious' ? <RuxStatus status='serious'></RuxStatus> 
                        : data.data.alerts[0].errorSeverity === 'caution' ? <RuxStatus status='caution'></RuxStatus> 
                        : null
                    }
                    {data.data.alerts[0].errorSeverity[0].toUpperCase() + data.data.alerts[0].errorSeverity.substring(1)}
                </p>
            </RuxTableCell>
        </>
    )
}

export default TableCell; 

