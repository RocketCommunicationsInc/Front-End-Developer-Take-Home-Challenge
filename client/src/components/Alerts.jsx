import { useState } from 'react';
import {
  RuxButton,
  RuxTable,
  RuxTableHeaderRow,
  RuxTableHeader,
  RuxTableHeaderCell,
  RuxTableBody,
  RuxTableRow,
  RuxTableCell,
  RuxModal,
  RuxCheckbox,
  RuxSelect,
  RuxOption
} from '@astrouxds/react';
import dataJson from '../data.json';

const Alerts = () => {
  const [data, setData] = useState(dataJson);

  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [select, setSelect] = useState('recent');

  console.log('select', select);
  //   console.log('checked', checked);
  //   console.log('data', data);

  const copyArr = [...data];
  const alertArray = copyArr
    .map((item) => item.alerts.map((item) => item))
    .flat();
  console.log(alertArray);
  console.log('copyArr', copyArr);

  const contactTimeFormat = (num) => {
    const min = Math.floor(num / 60000);
    const sec = Math.abs((num % 6000) / 1000).toFixed(0);
    return `${min} : ${sec < 10 ? '0' : ''} ${sec}`;
  };

  //*Close the modal and clear the state
  const handleCloseModal = () => {
    setOpen(false);
    if (modalData !== null) {
      setModalData([]);
    }
  };

  //*Show Details onClick will pass the item in, set modal state and the open state to true
  const handleModalClick = (item) => {
    setModalData((prev) => ({
      ...prev,
      modTitle: item.contactSatellite,
      modMessage: item.contactDetail
    }));
    setOpen(!open);
  };

  // *SET THE STATE SELECTED === TRUE FOR THE CHECKED ALERT
  const handleChange = (e, alert, itemId) => {
    setIsChecked(true);
    const { name, id, type, value, checked } = e.target;
    console.log('alert event id', id);
    // if ( type === 'checkbox') {
    setData((prev) => {
      return prev.map((item) => {
        return item._id === itemId && item.alerts[id] === alert
          ? {
              ...item,
              alerts: item.alerts.map((al, alIndex) =>
                al === alert ? { ...al, selected: true, [name]: checked } : al
              )
            }
          : item;
      });
    });
  };
  // *SEVERITY FILTER
  const sevLevs = () => {
    const dataCopy = [...data];
    const filteredSeverity = dataCopy.filter(
      (item) =>
        item.alerts.length > 0 &&
        item.alerts.every((sev) => select.includes(sev.errorSeverity))
    );
    return select === 'recent' ? dataCopy : filteredSeverity;
  };

  return (
    <div className='flex flex-col justify-center'>
      <header className='flex justify-around '>
        <div className='flex-col justify-center items-center'>
          <span>Total Alerts</span>
          <div className='text-4xl font-bold '>{alertArray.length}</div>
        </div>
        <div className='flex-col justify-center items-center'>
          <span>Unack' Alerts</span>
          <div className='text-4xl font-bold'>
            {alertArray.length -
              alertArray.filter((item) => item.selected === true).length}
          </div>
        </div>

        <RuxSelect
          input-id='1'
          label-id='1'
          label='Severity Search'
          onRuxchange={(e) => setSelect(e.target.value)}
          name='default'
          size='small'
          className='w-1/5 mb-2 items-center justify-center'>
          <RuxOption label='Severity'></RuxOption>
          <RuxOption value={'serious'} label='Serious'></RuxOption>
          <RuxOption value={'critical'} label='Critical'></RuxOption>
          <RuxOption value={'caution'} label='Caution'></RuxOption>
          <RuxOption value={'recent'} label='Recent'></RuxOption>
        </RuxSelect>
      </header>
      <RuxTable>
        <RuxTableHeader>
          <RuxTableHeaderRow>
            <RuxTableHeaderCell>Ack'</RuxTableHeaderCell>
            <RuxTableHeaderCell>Alert Message</RuxTableHeaderCell>
            <RuxTableHeaderCell>Contact Name</RuxTableHeaderCell>
            <RuxTableHeaderCell>Contact Time (min) </RuxTableHeaderCell>
            <RuxTableHeaderCell>Details</RuxTableHeaderCell>
          </RuxTableHeaderRow>
        </RuxTableHeader>

        {[...data].length > 0 &&
          sevLevs().map(
            (item) =>
              item.alerts.length > 0 && (
                <RuxTableBody key={item._id}>
                  {item.alerts.map((alert, idx) => (
                    <RuxTableRow
                      key={idx}
                      selected='false'
                      className={alert.selected === true && 'bg-green-900'}>
                      <RuxTableCell>
                        <RuxCheckbox
                          name={`checkedIndex-${idx}`}
                          id={idx}
                          type='checkbox'
                          disabled={alert.selected === true && !disabled}
                          value={isChecked}
                          //   checked={isChecked}
                          onRuxchange={(e) =>
                            handleChange(e, alert, item._id)
                          }></RuxCheckbox>
                      </RuxTableCell>
                      <RuxTableCell>{alert.errorMessage}</RuxTableCell>
                      <RuxTableCell>{item.contactName}</RuxTableCell>

                      <RuxTableCell>
                        {contactTimeFormat(
                          item.contactBeginTimestamp - item.contactEndTimestamp
                        )}
                      </RuxTableCell>
                      <div className=''>
                        <RuxButton onClick={() => handleModalClick(item)}>
                          Show Details
                        </RuxButton>
                      </div>
                    </RuxTableRow>
                  ))}
                </RuxTableBody>
              )
          )}
      </RuxTable>
      <RuxModal
        open={open}
        id={'modal'}
        modalTitle={modalData.modTitle}
        modalMessage={modalData.modMessage}
        confirmText='Ok'
        denyText='Cancel'
        onRuxmodalclosed={() => handleCloseModal()}></RuxModal>
    </div>
  );
};

export default Alerts;
