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
  RuxModal
} from '@astrouxds/react';

const Alerts = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [unAcknowledgedCount, setUnAcknowledgedCount] = useState(0);

  const copyArr = [...data];
  const alertArray = copyArr
    .map((item) => item.alerts.map((item) => item))
    .flat();
  console.log(alertArray);

  const contactTimeFormat = (num) => {
    const min = Math.floor(num / 60000);
    const sec = Math.abs((num % 6000) / 1000).toFixed(0);
    return `${min} : ${sec < 10 ? '0' : ''} ${sec}`;
  };

  const handleCloseModal = () => {
    //*Close the modal and clear the state
    setOpen(false);
    if (modalData !== null) {
      setModalData([]);
    }
  };

  const handleModalClick = (item) => {
    //*Show Details onClick will pass the item in, set modal state and the open state to true
    setModalData((prev) => ({
      ...prev,
      modTitle: item.contactSatellite,
      modMessage: item.contactDetail
    }));
    setOpen(!open);
  };
  return (
    <div className='flex flex-col justify-center'>
      <header className='flex flex-col items-center'>
        <div className='text-4xl font-bold'>{alertArray.length}</div>
        <span>Total Alerts</span>
      </header>
      <RuxTable>
        <RuxTableHeader>
          <RuxTableHeaderRow>
            <RuxTableHeaderCell>Alert Message</RuxTableHeaderCell>
            <RuxTableHeaderCell>Contact Name</RuxTableHeaderCell>
            <RuxTableHeaderCell>Contact Time (min) </RuxTableHeaderCell>
            <RuxTableHeaderCell>Details</RuxTableHeaderCell>
          </RuxTableHeaderRow>
        </RuxTableHeader>

        {copyArr.map(
          (item) =>
            item.alerts.length > 0 && (
              <RuxTableBody key={item.contactId}>
                {item.alerts.map((alert, idx) => (
                  <RuxTableRow key={idx} selected='false'>
                    <RuxTableCell>{alert.errorMessage}</RuxTableCell>
                    <RuxTableCell>{item.contactName}</RuxTableCell>

                    <RuxTableCell>
                      {contactTimeFormat(
                        item.contactBeginTimestamp - item.contactEndTimestamp
                      )}
                    </RuxTableCell>
                    <RuxTableCell>
                      <div className='flex flex-col justify-center items-center'>
                        <RuxButton onClick={() => handleModalClick(item)}>
                          Show Details
                          <RuxModal
                          className={'flex flex-col justify-center items-center text-center text-'}
                            open={open}
                            id={'modal'}
                            modalTitle={modalData.modTitle}
                            modalMessage={modalData.modMessage}
                            confirmText='Ok'
                            denyText='Cancel'
                            onRuxmodalclosed={() =>
                              handleCloseModal()
                            }></RuxModal>
                        </RuxButton>
                      </div>
                    </RuxTableCell>
                  </RuxTableRow>
                ))}
              </RuxTableBody>
            )
        )}
      </RuxTable>
    </div>
  );
};

export default Alerts;
