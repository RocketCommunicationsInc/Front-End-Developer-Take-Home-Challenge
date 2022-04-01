import { useState } from "react";
import data from '../data.json'
import {
    RuxTable,
    RuxTableBody,
    RuxModal
} from '@astrouxds/react'
import { TableHeader } from './TableHeader';
import { TableCell } from './TableCell';

export const Table = () => {

    const [rows, setRows] = useState(data);

    /* 
        WARNING: THIS CODE OF PIECE MUTATES THE ORIGINAL DATA.
        Calls a function for each row in rows, "detect" undeclared array in alerts, and then add the empty detail onto the undeclared array  
    */
    rows.forEach((row) => {
        if (typeof row.alerts[0] === 'undefined') {
            row.alerts.push({
                "errorId": "",
                "errorSeverity": "off",
                "errorCategory": "",
                "errorMessage": "No alert",
                "longMessage": "",
                "errorTime": "",
                "selected": false,
                "new": false,
                "expanded": false
            })
        }
    });

    /* The alerts to be sorted by error time with the most recent at the top */
    rows.sort((a, b) => (a.alerts[0].errorTime < b.alerts[0].errorTime ? 1 : -1));

    /* 
        By clicking on the button called Show Details, it utilizes RuxModal to show the detail. 
        Please go to references: RuxModal, allValues, setAllValues, onDetail, contactSatellite, contactDetail  
    */
    const [allValues, setAllValues] = useState({
        isOpen: false,
        modalTitle: '',
        modalMessage: ''
    });

    return (
        <>
            <RuxTable>
                <TableHeader />
                <RuxTableBody>
                    {rows.map((contact, index) => {
                        return (
                            <TableCell
                                data={contact}
                                key={index}
                                onDetail={(...prev) => setAllValues({ isOpen: true, modalTitle: prev[0], modalMessage: prev[1] })}
                            />
                        )
                    })}
                </RuxTableBody>
            </RuxTable>
            <RuxModal open={allValues.isOpen} modal-title={allValues.modalTitle} modal-message={allValues.modalMessage} confirm-text="OK" deny-text=""></RuxModal>
        </>
    )
}