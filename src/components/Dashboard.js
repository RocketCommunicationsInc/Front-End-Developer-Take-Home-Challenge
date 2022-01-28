import { 
    RuxTable,
    RuxTableHeader, 
    RuxTableRow, 
    RuxTableHeaderCell,
    RuxTableBody,
    RuxTableCell,
    RuxButton,
    RuxCheckbox,
} from '@astrouxds/react' 
import { useState, useMemo } from 'react'; 
import contacts from '../data.json';
import Dropdown from './Dropdown';
import Modal from './Modal'; 
import TableHeader from './TableHeaders';
import TableCell from './TableCells';

const Dashboard = () => {
    const [openModal, setOpenModal] = useState(false); 
    const [data, setData] = useState([]); 
    const [checked, setChecked] = useState(false); 
    const [value, setValue] = useState("")

    // filtering by contacts that contact alerts 
    let newContacts = contacts.filter((data) => data.alerts.length > 0)
    
    // most recent alerts sorted to top 
    newContacts.sort((a, b) => {
        return (a.contactEndTimestamp - a.contactBeginTimestamp) - (b.contactEndTimestamp - b.contactBeginTimestamp); 
    }); 

    // let critical = newContacts.filter((data) => data.alerts[0].errorSeverity === 'critical')
    // let serious = newContacts.filter((data) => data.alerts[0].errorSeverity === 'serious')
    // let caution = newContacts.filter((data) => data.alerts[0].errorSeverity === 'caution')

    const filteredContacts = useMemo(() => {
        if(!value || value === "All") return newContacts
        
        return newContacts.filter(item => item.alerts[0].errorSeverity === value)
    }, [value, newContacts]);
    
    return (
        <>
            <RuxTable>
                <RuxTableHeader>
                    <RuxTableRow>
                        <TableHeader/>
                        <RuxTableHeaderCell>
                            <Dropdown value={value} onChange={e => setValue(e.value)}/>
                        </RuxTableHeaderCell>
                        <RuxTableHeaderCell></RuxTableHeaderCell>
                        <RuxTableHeaderCell></RuxTableHeaderCell>
                    </RuxTableRow>
                </RuxTableHeader>
                <RuxTableBody>
                {filteredContacts.map((contact) => { 
                    return (
                        <RuxTableRow key={contact._id} selected='false'>
                            <TableCell data={contact}/>
                            <RuxTableCell><RuxButton
                                    onClick={() => {
                                        setData(contact);
                                        setOpenModal(true);
                                    }}
                                >
                                Show Details
                                </RuxButton>
                            </RuxTableCell> 
                            <RuxTableCell>
                                <RuxCheckbox 
                                    name={contact.contactName}
                                    onChange={(e => setChecked(e.target.checked))}
                                    onClick={() => setChecked(!checked)}
                                >
                               </RuxCheckbox>
                            </RuxTableCell>
                        </RuxTableRow>
                )})}
            </RuxTableBody> 
            </RuxTable>
            {openModal && <Modal openModal={openModal} setOpenModal={setOpenModal} data={data}/>}
        </>
    )
}

export default Dashboard; 



