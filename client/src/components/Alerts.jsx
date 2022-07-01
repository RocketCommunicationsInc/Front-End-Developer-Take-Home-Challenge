import React from 'react';
import {
  RuxLog,
  RuxTable,
  RuxTableHeaderRow,
  RuxTableHeader,
} from '@astrouxds/react';

const Alerts = ({ data }) => {

// const getAlerts = () => {
// const copyArr = [data]

// copyArr.map(item=> item.alerts)
// }

    const data1=[
    {
      timestamp: new Date(),
      status: 'off',
      message: 'Antenna DGS 1 went offline.',
    }
  ]

  return (
    <div className='flex flex-col justify-center'>
      <RuxLog data={data1} filter={''}>

      </RuxLog>
    </div>
  );
};

export default Alerts;
