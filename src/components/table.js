import React, { useState } from "react";
import { RuxTable } from "@astrouxds/react";
import Modal from './modal'
import Headers from './tableHeaders'
import TableRow from "./tableRow";
import { massageData } from "../helpers/massageData";
import { sortBasedOnErrorSeverity } from "../helpers/sortBasedOnErrorSeverity";
import data from '../mockData/data.json'

const Table = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState({});
    const [sortedField, setSortedField] = useState(null);
    const [isSorted, setIsSorted] = useState(null);
    const [isAscending, setIsAscending] = useState(null);
    const [contacts, setContacts] = useState(massageData(data));

    // if sorting field, sort alerts based on field clicked
    if (sortedField !== null && !isSorted) {
        // sort alerts based on severity
        const newContacts = sortBasedOnErrorSeverity(contacts, sortedField, isAscending);
        // store sorted contacts in state
        setContacts(newContacts)
        setIsSorted(true);
    }
    return (
        <div>
            <RuxTable>
                {/* pass in functions and values to allow sorting based on header columns */}
                <Headers setSortedField={setSortedField} setIsAscending={setIsAscending} isAscending={isAscending} setIsSorted={setIsSorted} />
                {/* map over alerts to display rows */}
                {contacts.alerts.map((alert, i) => <TableRow key={`${i}_${alert.errorId}_${alert.contactID}`} {...{ alert, i, setModalData, setModalOpen, setContacts, contacts }} />)}
            </RuxTable >
            {/* only show modal after modal is set to true */}
            {modalOpen && <Modal setModalOpen={setModalOpen} modalOpen={modalOpen} modalData={modalData} setModalData={setModalData} />}
        </div>
    )
}

export default Table;