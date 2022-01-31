import { 
    RuxTable,
    RuxTableHeader, 
    RuxTableRow, 
    RuxTableHeaderCell,
    RuxTableBody,
    RuxTableCell,
    RuxButton,
    RuxSelect,
    RuxOption,
    RuxCheckbox
} from '@astrouxds/react' 
import { useState, useMemo } from 'react'; 
import contacts from '../data.json';
import Modal from './Modal'; 
import TableHeader from './TableHeaders';
import TableCell from './TableCells';

const Dashboard = () => {
    const [openModal, setOpenModal] = useState(false); 
    const [data, setData] = useState([]); 
    const [checked, setChecked] = useState(false); 
    const [value, setValue] = useState('All'); 

    // filtering by contacts that contact alerts 
    let newContacts = contacts.filter((data) => data.alerts.length > 0)
    
    // most recent alerts sorted to top 
    newContacts.sort((a, b) => {
        return (a.contactEndTimestamp - a.contactBeginTimestamp) - (b.contactEndTimestamp - b.contactBeginTimestamp); 
    }); 
  
    const filteredContacts = useMemo(() => {
        if(!value || value === 'All') return newContacts 

        return newContacts.filter(item => item.alerts[0].errorSeverity === value)
    }, [value, newContacts]);

    const handleCheckbox = (event) => {
        setChecked(event.target.value); 
    }

    console.log(checked)

    return (
        <>
            <RuxTable>
                <RuxTableHeader>
                    <RuxTableRow>
                        <TableHeader/>
                        <RuxTableHeaderCell>
                        <RuxSelect value={value} onMouseLeave={(e) => setValue(e.target.value)}>
                                <RuxOption 
                                    value=''
                                    label='All'>
                                </RuxOption>
                                <RuxOption 
                                    value='critical'
                                    label='Critical'>
                                </RuxOption>
                                <RuxOption 
                                    value='serious'
                                    label='Serious'>
                                </RuxOption> 
                                <RuxOption 
                                    value='caution'
                                    label='Caution'>
                                </RuxOption> 
                        </RuxSelect>
                        </RuxTableHeaderCell>
                        <RuxTableHeaderCell>Details</RuxTableHeaderCell>
                        <RuxTableHeaderCell>Acknowledged</RuxTableHeaderCell>
                    </RuxTableRow>
                </RuxTableHeader>
                <RuxTableBody>
                {filteredContacts.map((contact) => { 
                    return (
                        <RuxTableRow selected={checked === contact._id ? '' : 'false'}>
                            <TableCell data={contact} key={contact._id}/>
                            <RuxTableCell>
                                <RuxButton
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
                                 type="checkbox" 
                                 className="acknowledged" 
                                 value={contact._id}
                                 onClick={handleCheckbox}
                                 key={contact._id}
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

{/* <input 
type="checkbox" 
className="acknowledged" 
value={contact._id}
onChange={handleCheckbox}
/> */}
