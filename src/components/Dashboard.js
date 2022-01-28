import { 
    RuxTable,
    RuxTableHeader, 
    RuxTableRow, 
    RuxTableHeaderCell,
    RuxTableBody,
    RuxTableCell,
    RuxButton,
    RuxCheckbox,
    RuxSelect,
    RuxOption
} from '@astrouxds/react' 

import { useState } from 'react'; 
import contacts from '../data.json';
import AlertDetails from './AlertDetails'; 

const Dashboard = () => {
    const [openModal, setOpenModal] = useState(false); 
    const [data, setData] = useState([]); 
    const [checked, setChecked] = useState({}); 

    let newContacts = contacts.filter((data) => data.alerts.length > 0)
 
    // const filterByCritical = () => {
    //     return contacts.filter((data) => data.alerts[0].errorSeverity === 'critical')
    // }

    return (
        <>
            <RuxTable>
                <RuxTableHeader>
                    <RuxTableRow>
                        <RuxTableHeaderCell>Name</RuxTableHeaderCell>
                        <RuxTableHeaderCell>Ground</RuxTableHeaderCell>
                        <RuxTableHeaderCell>Time</RuxTableHeaderCell>
                        <RuxTableHeaderCell>Status</RuxTableHeaderCell>
                        <RuxTableHeaderCell>State</RuxTableHeaderCell>
                        <RuxTableHeaderCell>Step</RuxTableHeaderCell>
                        <RuxTableHeaderCell>Alert Message</RuxTableHeaderCell>
                        <RuxTableHeaderCell>Error Severity
                            {""}
                            <RuxSelect label="" input-id="1" label-id="1">
                                <RuxOption value="" selected="" label="Filter By"></RuxOption>
                            </RuxSelect>
                        </RuxTableHeaderCell>
                        <RuxTableHeaderCell>Details</RuxTableHeaderCell>
                        <RuxTableHeaderCell></RuxTableHeaderCell>
                    </RuxTableRow>
                </RuxTableHeader>
                <RuxTableBody>
                {newContacts.map((contact) => { 
                    return (
                        <RuxTableRow key={contact._id} selected="false">
                        <RuxTableCell>{contact.contactName}</RuxTableCell>
                        <RuxTableCell>{contact.contactGround}</RuxTableCell>
                        <RuxTableCell>{contact.contactEndTimestamp - contact.contactBeginTimestamp}</RuxTableCell>
                        <RuxTableCell>{contact.contactStatus[0].toUpperCase() + contact.contactStatus.substring(1)}</RuxTableCell>
                        <RuxTableCell>{contact.contactState[0].toUpperCase() + contact.contactState.substring(1)}</RuxTableCell>
                        <RuxTableCell>{contact.contactStep}</RuxTableCell>
                        <RuxTableCell>{contact.alerts[0].errorMessage}</RuxTableCell>
                        <RuxTableCell>{contact.alerts[0].errorSeverity[0].toUpperCase() + contact.alerts[0].errorSeverity.substring(1)}</RuxTableCell>
                        <RuxTableCell><RuxButton
                                onClick={() => {
                                    setData(contact);
                                    setOpenModal(true);
                                }}
                            >
                            View
                            </RuxButton>
                        </RuxTableCell> 
                        <RuxTableCell>
                            {checked.id === contact._id ? 
                            (<RuxCheckbox 
                                checked=''
                                name={contact.contactName}
                                onClick={(e) => {setChecked(contact)}}>
                            </RuxCheckbox>) : 
                            (<RuxCheckbox 
                                name={contact.contactName}
                                onClick={(e) => {setChecked(contact)}}>
                            </RuxCheckbox>)
                            }
                        </RuxTableCell>
                    </RuxTableRow>
                )})}
            </RuxTableBody> 
            </RuxTable>
            {openModal && <AlertDetails openModal={openModal} setOpenModal={setOpenModal} data={data}/>}
        </>
    )
}

export default Dashboard; 