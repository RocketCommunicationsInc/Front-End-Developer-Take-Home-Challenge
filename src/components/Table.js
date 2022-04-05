import { useState } from "react";
import { RuxTable, RuxTableBody } from "@astrouxds/react";
import { TableHeader } from './TableHeader';
import { TableCell } from './TableCell';
import { Modal } from './Modal';

export default function Table(rows) {

    const [newRows, setNewRows] = useState(rows.data);
    const [filteredRows, setFilteredRows] = useState([]);
    const [severityInput, setSeverityInput] = useState('');

    /* 
        By clicking on the button called Show Details, it utilizes RuxModal to show the detail. 
        Please go to references: RuxModal, detail, setDetail, onDetail, contactSatellite, contactDetail  
    */
    const [detail, setDetail] = useState([]);

    /* 
        view alerts by their severity as well 
        so that they can prioritize acknowledging the more severe alerts first.
        Please go to references: searchSeverity, setSeverityInput, filteredData, setFilteredRows, searchSeverity, onSeverity
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
        setDetail({
            isOpen: false,
            modalTitle: '',
            modalMessage: ''
        });
    }

    return (
        <>
            <RuxTable>
                <TableHeader data={newRows} onSeverity={(value) => searchSeverity(value)} />
                <RuxTableBody>
                    {severityInput ? (
                        filteredRows.map((contact) => {
                            return (
                                <TableCell
                                    data={contact}
                                    key={contact._id}
                                    onDetail={(...previous) => setDetail({ isOpen: true, modalTitle: previous[0], modalMessage: previous[1] })}
                                />
                            )
                        })
                    ) : (
                        newRows.map((contact) => {
                            return (
                                <TableCell
                                    data={contact}
                                    key={contact._id}
                                    onDetail={(...previous) => setDetail({ isOpen: true, modalTitle: previous[0], modalMessage: previous[1] })}
                                />
                            )
                        })
                    )}
                </RuxTableBody>
            </RuxTable>
            <Modal data={detail} />
        </>
    )
}
