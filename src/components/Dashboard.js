import { 
    RuxTable,
    RuxTableHeader, 
    RuxTableRow, 
    RuxTableHeaderCell,
    RuxTableBody,
    RuxTableCell,
    RuxButton,
    RuxSelect,
    RuxOption
} from '@astrouxds/react' 
import { useState, useMemo } from 'react'; 
import contacts from '../data.json';
import Modal from './Modal'; 
import TableHeader from './TableHeaders';
import TableCell from './TableCells';

const Dashboard = () => {
    const [openModal, setOpenModal] = useState(false); 
    const [data, setData] = useState([]); 
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

    const [checked, setChecked] = useState(new Array(newContacts.length).fill(false));

    const handleCheckbox = (position) => {
        const updatedCheckedState = checked.map((item, index) => {
            if (index === position) {
                return !item;
            } else {
                return item;
            }
        });
        setChecked(updatedCheckedState);
    };

    return (
        <>
            <RuxTable>
                <RuxTableHeader>
                    <RuxTableRow>
                        <TableHeader/>
                        <RuxTableHeaderCell>
                        <span>Filter By:</span>
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
                    {filteredContacts.map((contact, name) => { 
                        return (
                            <RuxTableRow key={name} selected={checked[name] === true ? '' : 'false'}>
                                <TableCell data={contact}/>
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
                                    <input 
                                        type="checkbox" 
                                        value={contacts._id}
                                        name={contacts._id}
                                        onChange={() => handleCheckbox(name)}
                                        checked={checked[name]}
                                    />                               
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

