import './App.css';
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';

import { RuxButton, RuxClock, } from '@astrouxds/react';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Alerts from './components/Alerts';
// import dataJson from './data.json';
const App = () => {
  // console.log(dataJson)

  // const [data, setData] = useState(dataJson);

  // const dataCopy = [...data];
  // console.log("get access to selected", dataCopy[4].alerts[0].selected)
  const alertAcknowledged = (name, value,ackTrue, alert, idx) => {
  //  setData(prev=> ({...prev,...prev.map(item=> item&& console.log(item)) }))
  console.log("ackTrueinappjs",ackTrue);
  
  }
   
  return (
    <div className=''>
      <Navbar />
      {/* <Alerts data={data} alertAcknowledged={alertAcknowledged} /> */}
      <Alerts />
    </div>
  );
};

export default App;
