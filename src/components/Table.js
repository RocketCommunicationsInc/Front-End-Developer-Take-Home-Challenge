import { useState, useEffect } from "react";
import { RuxTable, RuxTableBody } from "@astrouxds/react";
import { TableHeader } from './TableHeader';
import { TableCell } from './TableCell';
import { Modal } from './Modal';

export default function Table(rows) {

    const [newRows, setNewRows] = useState(rows.data);
    const [filteredRows, setFilteredRows] = useState([]);
    const [openModal, setOpenModal] = useState(null);

    /*
        Make the data persist
    */
    useEffect(() => {
        if (filteredRows.length === 0) {
            setFilteredRows(newRows);
        }
    }, [filteredRows, newRows])

    /* 
        view alerts by their severity as well so that they can prioritize acknowledging the more severe alerts first.
        Please go to references: searchSeverity, setSeverityInput, filteredData, setFilteredRows, onSeverity
    */
    const searchSeverity = (value) => {
        if (value !== 'all') {
            const filteredData = newRows.filter((row) => {
                return row.alerts[0].errorSeverity === value;
            })
            setFilteredRows(filteredData);
        } else {
            setFilteredRows(newRows);
        }
    }

    /* 
        By clicking on the button called Show Details, it utilizes RuxModal to show the detail. 
        Please go to references: Modal (RuxModal), openModal, setOpenModal, checkDetail, onDetail, contactSatellite, contactDetail  
    */
    function checkDetail(value) {
        if (value) {
            setOpenModal(<Modal data={value} />);
        } else {
            return false;
        }
    }

    /*
        Eliminate the target row while clicking the 'Acknowledge' button
        Please go to references: onAck
        FIXME: Need to find out why the sort is messing up with the list
    */
    const checkID = (id) => {
        const emptyArray = [];
        /* if clicking the acknowledge button in the target row, we will copy and paste the object from the target row to the empty array */
        filteredRows.filter(row => row._id === id ? emptyArray.push(row) : undefined);
        /* if clicking the acknowledge button in the target row, it will be eliminated */
        const newFilteredRows = filteredRows.filter((row) => row._id !== id);
        /* update the list */
        setFilteredRows(newFilteredRows);
        /* empty the existing alerts in the empty array */
        emptyArray[0].alerts = [];
        /* fill the new alerts in the empty array */
        emptyArray[0].alerts.push({
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
        /* update the list */
        setFilteredRows(oldArray => [...oldArray, ...emptyArray]);
        /* The alerts to be sorted by error time with the most recent at the top again after add a new object onto the existing data */
        filteredRows.sort((a, b) => (a.alerts[0].errorTime < b.alerts[0].errorTime ? 1 : -1));
    }

    return (
        <>
            <RuxTable>
                <TableHeader data={newRows} onSeverity={(value) => searchSeverity(value)} />
                <RuxTableBody>
                    {
                        filteredRows.map((contact) => {
                            return (
                                <TableCell
                                    data={contact}
                                    key={contact._id}
                                    onDetail={(...previous) => checkDetail({ isOpen: true, modalTitle: previous[0], modalMessage: previous[1] })}
                                    onAck={(id) => checkID(id)}
                                />
                            )
                        })
                    }
                </RuxTableBody>
            </RuxTable>
            {openModal}
        </>
    )
}
