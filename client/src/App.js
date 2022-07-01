
import './App.css';
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css'
import { RuxButton,RuxClock } from '@astrouxds/react'
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Alerts from './components/Alerts';
import dataJson from './data.json'
const App= ()=> {
// console.log(dataJson)
const [data, setData]=useState(dataJson)

  return (
    <div className="">
 <Navbar/>
<Alerts date={data}/>
    </div>
  );
}

export default App;

// const [myArr, setMyArr]=useState([{A:"one"},{B:'two'}])
// const [isArrayChanged, setIsArrayChanged]= useState(false)

// const addItem = () => {
//   // business logic that sets isArrayChanged to "true" if the array changed
// // useEffect will run when this function adds an item to the array
// }
// useEffect(()=> {
// console.log(`My array ${myArr} has changed it's length`)

// // cleanup here 
// },[isArrayChanged])