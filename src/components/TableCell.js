import { RuxTableRow, RuxButton } from '@astrouxds/react'

export const TableCell = ({ data: { _id, contactName, contactDetail, contactSatellite, contactBeginTimestamp, contactEndTimestamp, alerts }, onDetail, onAck }) => {

    const errorMessage = alerts[0].errorMessage;
    const errorSeverity = alerts[0].errorSeverity;

    /* Self explanatory */
    const convertEpochToHumanReadable = (time) => {
        let minutes = '';
        let seconds = '';
        let newTime;
        if (time < 3600) {
            minutes = Math.floor(time / 60);
            seconds = '00';
            newTime = `00:${minutes}:${seconds}`;
            return newTime;
        }
    };

    const epochTime = contactEndTimestamp - contactBeginTimestamp;
    const humanTime = convertEpochToHumanReadable(epochTime);

    return (
        <>
            <RuxTableRow key={_id} className={`status-row-${errorSeverity}`}>
                <rux-table-cell><rux-monitoring-icon icon="equipment" status={errorSeverity}></rux-monitoring-icon></rux-table-cell>
                <rux-table-cell>{errorMessage}</rux-table-cell>
                <rux-table-cell>{contactName}</rux-table-cell>
                <rux-table-cell>{humanTime}</rux-table-cell>
                <rux-table-cell>
                    <RuxButton secondary="true" onClick={() => onDetail(contactSatellite, contactDetail)}>
                        <rux-icon icon="search" size="extra-small"></rux-icon>
                        Show Details
                    </RuxButton>
                    <RuxButton
                        className={`status-button-${errorSeverity}`} onClick={() => onAck(_id)}>
                        <rux-icon icon="done" size="extra-small"></rux-icon>
                        Acknowledge
                    </RuxButton>
                </rux-table-cell>
            </RuxTableRow>
        </>
    )
}