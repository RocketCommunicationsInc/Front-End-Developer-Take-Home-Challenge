import {
    RuxStatus,
    RuxTableCell,
    RuxTableRow,
    RuxButton,
} from "@astrouxds/react";

const TableRow = (props) => {
    const { alert, i, setModalData, setModalOpen, setContacts, contacts } = props;
    return (
        <RuxTableRow className={alert.acknowledge ? "" : `unacknowledge ${alert.errorSeverity}`}>
            <RuxTableCell>
                <RuxStatus status={alert.errorSeverity} />
                {alert.errorMessage}
            </RuxTableCell>
            <RuxTableCell>
                {alert.contactName}
            </RuxTableCell>
            <RuxTableCell>
                {alert.contactTime}
            </RuxTableCell>
            <RuxTableCell>
                {alert.errorSeverity}
            </RuxTableCell>
            <RuxTableCell>
                <RuxButton onClick={() => {
                    // set modalData first so data is available before modal opens
                    setModalData(contacts.contacts[alert.contactID]);
                    setModalOpen(true);
                }}>
                    Show Details
                </RuxButton>
                {" "}
                {/* if alert is not ackowledge, show acknowledge button */}
                {!alert.acknowledge &&
                    <RuxButton onClick={() => {
                        //copy massagedData
                        const newContacts = { ...contacts }
                        // set acknowledge value to true at current index
                        newContacts.alerts[i].acknowledge = true;
                        // store data in state
                        setContacts(newContacts)
                    }}>
                        Acknowledge
                    </RuxButton>
                }
            </RuxTableCell>
        </RuxTableRow>
    )
}

export default TableRow