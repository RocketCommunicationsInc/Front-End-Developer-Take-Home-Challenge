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
  RuxStatus
} from '@astrouxds/react';
import dataJson from '../data.json';
import SeveritySelect from './SeveritySelect';

const Alerts = () => {
  const [data, setData] = useState(dataJson);

  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [select, setSelect] = useState('recent');

  // *SET UP FLAT ARRAY FOR TOTAL ALERTS
  const copyArr = [...data];
  const alertArray = copyArr
    .map((item) => item.alerts.map((item) => item))
    .flat();
  console.log(alertArray);
  console.log('copyArr', copyArr);

  //*FORMAT TIME TO MINUTES
  const contactTimeFormat = (num) => {
    const min = Math.floor(num / 60000);
    const sec = Math.abs((num % 6000) / 1000).toFixed(0);
    return `${min} : ${sec < 10 ? '0' : ''} ${sec}`;
  };

  //*OPEN/CLOSE MODAL,CLEAR STATE
  const handleCloseModal = () => {
    setOpen(false);
    if (modalData !== null) {
      setModalData([]);
    }
  };

  // * SHOW DETAILS BUTTON PASS IN STATE VALUES AND SET MODAL STATE TO OPEN
  const handleModalClick = (item) => {
    setModalData((prev) => ({
      ...prev,
      modTitle: item.contactSatellite,
      modMessage: item.contactDetail
    }));
    setOpen(!open);
  };

  // *FOR CHECKBOXES SET THE STATE SELECTED === TRUE FOR THE CHECKED ALERT
  const handleChange = (e, alert, itemId) => {
    setIsChecked(true);
    const { name, id, type, checked } = e.target;
    console.log('alert event id', id);

    if (type === 'checkbox') {
      setData((prev) => {
        return prev.map((item) => {
          return item._id === itemId && item.alerts[id] === alert
            ? {
                ...item,
                alerts: item.alerts.map((al) =>
                  al === alert ? { ...al, selected: true, [name]: checked } : al
                )
              }
            : item;
        });
      });
    }
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

  // *SELECT DROP DOWN SEVERITY TARGET
  const handleSelect = (e) => {
    setSelect(e.target.value);
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
        <SeveritySelect select={select} handleSelect={handleSelect} />
      </header>
      <RuxTable>
        <RuxTableHeader>
          <RuxTableHeaderRow>
            <RuxTableHeaderCell>Ack'</RuxTableHeaderCell>
            <RuxTableHeaderCell>Status</RuxTableHeaderCell>
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
                          onRuxchange={(e) =>
                            handleChange(e, alert, item._id)
                          }></RuxCheckbox>
                      </RuxTableCell>
                      <RuxTableCell>
                        {alert.errorSeverity === 'warning' ? (
                          <RuxStatus status='caution' />
                        ) : (
                          <RuxStatus status={alert.errorSeverity} />
                        )}
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
