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
import { useState, useMemo } from 'react'; 
import contacts from '../data.json';
// import Dropdown from './Dropdown';
import Modal from './Modal'; 
import TableHeader from './TableHeaders';
import TableCell from './TableCells';

const Dashboard = () => {
    const [openModal, setOpenModal] = useState(false); 
    const [data, setData] = useState([]); 
    const [checked, setChecked] = useState(false); 
    const [value, setValue] = useState(false); 

    // filtering by contacts that contact alerts 
    let newContacts = contacts.filter((data) => data.alerts.length > 0)
    
    // most recent alerts sorted to top 
    newContacts.sort((a, b) => {
        return (a.contactEndTimestamp - a.contactBeginTimestamp) - (b.contactEndTimestamp - b.contactBeginTimestamp); 
    }); 
  
   
    const filteredContacts = useMemo(() => {
        if(!value || value === "All") return newContacts 

        return newContacts.filter(item => item.alerts[0].errorSeverity === value)
    }, [value, newContacts]);

    // if(checked === true) {
    //     console.log('im true')
    // }

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



 // if(newContacts.alerts[0].errorSeverity === 'critical') {
    //     return document.getElementsById('error').style.color = 'pink'
    // }

    // const changeHandler = e => {
    //     const value = e.target.value; 
    //     if(value === "All") {
    //         return newContacts
    //     } else if (value === "critical") {
    //         setFilteredContacts(newContacts.filter((data) => data.alerts[0].errorSeverity === 'critical'));
    //     } else if (value === "serious") {
    //         setFilteredContacts(newContacts.filter((data) => data.alerts[0].errorSeverity === 'serious'));
    //     } else if (value === "caution") {
    //         setFilteredContacts(newContacts.filter((data) => data.alerts[0].errorSeverity === 'caution')); 
    //     }
    // }


