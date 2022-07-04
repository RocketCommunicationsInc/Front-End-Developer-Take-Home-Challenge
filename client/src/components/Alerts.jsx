import { useState } from 'react';
import {
  RuxLog,
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
  // const {alerts}=data
  const [open, setOpen] = useState(false);
  console.log(data);

  const copyArr = [...data];
  const alertArray = copyArr
    .map((item) => item.alerts.map((item) => item))
    .flat();
  console.log(alertArray);

  //   console.log('sortcheck', sortCheck);
  //   console.log('sortchecktime', new Date(1542134427946));
  //   console.log('sortchecktime', new Date(1542134421939));
  //   console.log('Antenna HTS2-WEAKSUGNAL', new Date(1542134358852));
  //   console.log('Black FEP 121 - Degraded', new Date(1542134277742));

  const contactTimeFormat = (num) => {
    const min = Math.floor(num / 60000);
    const sec = Math.abs((num % 6000) / 1000).toFixed(0);
    return `${min} : ${sec < 10 ? '0' : ''} ${sec}`;
  };
  const handleModalClose = () => {
    console.log('handle the modal close click');
  };
  return (
    <div className='flex flex-col justify-center'>
      <header className='flex flex-col items-center'>
        <div className='text-4xl font-bold'>{alertArray.length}</div>
        <span>Total Alerts</span>
        <div className='text-4xl font-bold'>
          {alertArray.new ? alertArray.length : 0}
        </div>
        <span>New Alerts</span>
      </header>
      <RuxTable>
        <RuxTableHeader>
          <RuxTableHeaderRow>
            <RuxTableHeaderCell>Alert Message</RuxTableHeaderCell>
            <RuxTableHeaderCell>Contact Name</RuxTableHeaderCell>
            <RuxTableHeaderCell>Contact Time</RuxTableHeaderCell>
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


                    <div className='flex flex-col justify-center'>
                    <RuxButton onClick={() => setOpen(true)}>
                      Show Details
                    </RuxButton>
                      <RuxModal
                        open={open}
                        title={'Modal title test helo '}
                        message={'Modal message'}
                        onClick={() => setOpen(false)}></RuxModal>
                    </div>
                  </RuxTableRow>
                ))}

                {/* </RuxTableRow> */}
              </RuxTableBody>
            )
        )}
      </RuxTable>
    </div>
  );
};

export default Alerts;
