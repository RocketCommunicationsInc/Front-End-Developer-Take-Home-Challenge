import { 
    RuxTable,
    RuxTableHeader, 
    RuxTableRow, 
    RuxTableHeaderCell,
    RuxTableBody,
    RuxTableCell,
    RuxButton
} from '@astrouxds/react' 

import { useState } from 'react'; 
import jsonData from '../data.json';
import AlertDetails from './AlertDetails'; 

const Dashboard = () => {
    const [modalOpen, setModalOpen] = useState(false); 
    const [data, setData] = useState({}); 
    // const [checked, setChecked] = useState(); 
    
    let contacts = jsonData.filter((data) => data.alerts.length > 0)


    return (
        <>
            <RuxTable>
                <RuxTableHeader>
                    <RuxTableRow>
                        <RuxTableHeaderCell>Name</RuxTableHeaderCell>
                        <RuxTableHeaderCell>Satellite</RuxTableHeaderCell>
                        <RuxTableHeaderCell>Ground</RuxTableHeaderCell>
                        <RuxTableHeaderCell>Time</RuxTableHeaderCell>
                        <RuxTableHeaderCell>Status</RuxTableHeaderCell>
                        <RuxTableHeaderCell>State</RuxTableHeaderCell>
                        <RuxTableHeaderCell>Step</RuxTableHeaderCell>
                        <RuxTableHeaderCell>Alert Message</RuxTableHeaderCell>
                        <RuxTableHeaderCell>Error Severity</RuxTableHeaderCell>
                        <RuxTableHeaderCell>Details</RuxTableHeaderCell>
                        <RuxTableHeaderCell></RuxTableHeaderCell>
                    </RuxTableRow>
                </RuxTableHeader>
            {contacts.map((contact, i) => { 
                return (
                <RuxTableBody>
                    <RuxTableRow key={contact.contactId} selected="false" >
                        <RuxTableCell>{contact.contactName}</RuxTableCell>
                        <RuxTableCell>{contact.contactSatellite}</RuxTableCell>
                        <RuxTableCell>{contact.contactGround}</RuxTableCell>
                        <RuxTableCell>{contact.contactEndTimestamp - contact.contactBeginTimestamp}</RuxTableCell>
                        <RuxTableCell>{contact.contactStatus[0].toUpperCase() + contact.contactStatus.substring(1)}</RuxTableCell>
                        <RuxTableCell>{contact.contactState[0].toUpperCase() + contact.contactState.substring(1)}</RuxTableCell>
                        <RuxTableCell>{contact.contactStep}</RuxTableCell>
                        <RuxTableCell>{contact.alerts[0].errorMessage}</RuxTableCell>
                        <RuxTableCell>{contact.alerts[0].errorSeverity[0].toUpperCase() + contact.alerts[0].errorSeverity.substring(1) }</RuxTableCell>
                        <RuxTableCell><RuxButton
                                onClick={() => {
                                    setModalOpen(true);
                                    setData(data);
                                }}
                            >
                            View
                            </RuxButton>
                        </RuxTableCell> 
                    </RuxTableRow>
                </RuxTableBody> 
            )})}
            </RuxTable>
            {modalOpen && <AlertDetails data={data} setData={setData} modalOpen={modalOpen} setModalOpen={setModalOpen} />}
        </>
    )
}

export default Dashboard; 