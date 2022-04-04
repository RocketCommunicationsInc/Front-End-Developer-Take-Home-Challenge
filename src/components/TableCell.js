import { useState } from "react";
import { RuxTableRow, RuxButton } from '@astrouxds/react'

export const TableCell = ({ data: { index, _id, contactName, contactDetail, contactSatellite, contactBeginTimestamp, contactEndTimestamp, alerts }, onDetail }) => {

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

    const errorMessage = alerts[0].errorMessage;
    const errorSeverity = alerts[0].errorSeverity;

    /*
        When they click 'Acknowledge' button, we call setOnAck with a new value. onAck will add the new value to ack-button-${onAck} and ack-row-${onAck}. 
        The target acknowledge button will be disappear, and the target row's background color will be change. 

        If they want to eliminate the target row by clicking the Acknowledge button, we need to create a new UseState and add it onto Table.js
    */
    const [onAck, setOnAck] = useState("");

    return (
        <>
            <RuxTableRow key={_id} className={`status-row-${errorSeverity} ack-row-${onAck}`}>
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
                        className={`status-button-${errorSeverity} ack-button-${onAck}`} onClick={() => setOnAck((cls) => (cls === "none" ? "display" : "none"))}>
                        <rux-icon icon="done" size="extra-small"></rux-icon>
                        Acknowledge
                    </RuxButton>
                </rux-table-cell>
            </RuxTableRow>
        </>
    )
}