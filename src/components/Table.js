import { useState, useEffect } from "react";
import { RuxTable, RuxTableBody } from "@astrouxds/react";
import { TableHeader } from './TableHeader';
import { TableCell } from './TableCell';
import { Modal } from './Modal';

export default function Table(rows) {

    const [newRows, setNewRows] = useState(rows.data);
    const [filteredRows, setFilteredRows] = useState([]);
    const [severityInput, setSeverityInput] = useState('');
    const [openModal, setOpenModal] = useState(null);

    /*
        Make the data persist
    */
    useEffect(() => {
        if (filteredRows.length === 0) {
            setFilteredRows(newRows);
        }
    }, [filteredRows.length, newRows])

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
        view alerts by their severity as well 
        so that they can prioritize acknowledging the more severe alerts first.
        Please go to references: searchSeverity, setSeverityInput, filteredData, setFilteredRows, onSeverity
    */
    const searchSeverity = (value) => {
        setSeverityInput(value);
        if (value !== 'all') {
            const filteredData = newRows.filter((row) => {
                return row.alerts[0].errorSeverity === value;
            })
            setFilteredRows(filteredData);
        } else {
            setFilteredRows(newRows);
        }
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
