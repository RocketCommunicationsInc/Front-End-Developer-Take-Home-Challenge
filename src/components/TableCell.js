import { useState } from "react";
import { RuxTableRow, RuxTableCell, RuxButton, RuxMonitoringIcon } from "@astrouxds/react";

export const TableCell = ({ data: { index, _id, contactName, contactDetail, contactSatellite, contactBeginTimestamp, contactEndTimestamp, alerts }, onDetail }) => {

    // avoid 'cannot read property of undefined errors.... I can't think of any better way for this one. 
    function getSafe(fn, defaultAlert) {
        try {
            return fn();
        } catch (e) {
            return defaultAlert;
        }
    }

    const newErrorSeverity = getSafe(() => alerts[0].errorSeverity, 'off');
    const newErrorMessage = getSafe(() => alerts[0].errorMessage, 'N/A');

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

    const [onAck, setOnAck] = useState("");

    return (
        <>
            <RuxTableRow key={index} className={`status-row-${newErrorSeverity} ack-row-${onAck}`}>
                <RuxTableCell><RuxMonitoringIcon icon="equipment" status={newErrorSeverity}></RuxMonitoringIcon></RuxTableCell>
                <RuxTableCell>{newErrorMessage}</RuxTableCell>
                <RuxTableCell>{contactName}</RuxTableCell>
                <RuxTableCell>{humanTime}</RuxTableCell>
                <RuxTableCell>
                    <RuxButton secondary="true" onClick={() => onDetail(contactSatellite, contactDetail)}>
                        <rux-icon icon="search" size="extra-small"></rux-icon>
                        Show Details
                    </RuxButton>
                    <RuxButton className={`status-button-${newErrorSeverity} ack-button-${onAck}`} onClick={() => setOnAck((cls) => (cls === "none" ? "display" : "none"))}>
                        <rux-icon icon="done" size="extra-small"></rux-icon>
                        Acknowledge
                    </RuxButton>
                </RuxTableCell>
            </RuxTableRow>
        </>
    )
}