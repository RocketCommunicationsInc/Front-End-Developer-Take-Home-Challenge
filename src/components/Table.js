import { useState } from "react";
import { RuxTable, RuxTableBody } from "@astrouxds/react";
import { TableHeader } from './TableHeader';
import { TableCell } from './TableCell';
import { Modal } from './Modal';

export const Table = (rows) => {
    /* TODO: The click handlers are on all buttons. Need to review the code again. 

    /* 
        view alerts by their severity as well 
        so that they can prioritize acknowledging the more severe alerts first.
        Please go to references: viewSeverity, setViewSeverity, onSeverity
    */
    const [viewSeverity, setViewSeverity] = useState('All');
    let filtered = rows.data.filter((row) => {
        if (viewSeverity !== 'all') {
            return row.alerts[0].errorSeverity === viewSeverity;
        } else if (viewSeverity === 'all') {
            return row.alerts[0].errorSeverity !== ''
        } else {
            return false;
        }
    });

    /* 
        By clicking on the button called Show Details, it utilizes RuxModal to show the detail. 
        Please go to references: RuxModal, detail, setDetail, onDetail, contactSatellite, contactDetail  
    */
    const [detail, setDetail] = useState({
        isOpen: false,
        modalTitle: '',
        modalMessage: ''
    });

    return (
        <>
            <RuxTable>
                <TableHeader onSeverity={(value) => setViewSeverity(value)} />
                <RuxTableBody>
                    {filtered.length > 0 ? (
                        filtered.map((contact, index) => {
                            return (
                                <TableCell
                                    data={contact}
                                    key={index}
                                    onDetail={(...previous) => setDetail({ isOpen: true, modalTitle: previous[0], modalMessage: previous[1] })}
                                />
                            )
                        })
                    ) :
                        rows.data.map((contact, index) => {
                            return (
                                <TableCell
                                    data={contact}
                                    key={index}
                                    onDetail={(...previous) => setDetail({ isOpen: true, modalTitle: previous[0], modalMessage: previous[1] })}
                                />
                            )
                        })

                    }
                </RuxTableBody>
            </RuxTable>
            <Modal data={detail} />
        </>
    )
}
