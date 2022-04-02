import { useState } from "react";
import { RuxTable, RuxTableBody } from "@astrouxds/react";
import { TableHeader } from './TableHeader';
import { TableCell } from './TableCell';
import { Modal } from './Modal';

export const Table = (rows) => {

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
                <TableHeader />
                <RuxTableBody>
                    {rows.data.map((contact, index) => {
                        return (
                            <TableCell
                                data={contact}
                                key={index}
                                onDetail={(...prev) => setDetail({ isOpen: true, modalTitle: prev[0], modalMessage: prev[1] })}
                            />
                        )
                    })}
                </RuxTableBody>
            </RuxTable>
            <Modal data={detail} />
        </>
    )
}
