import React from 'react'
import { RuxGlobalStatusBar,RuxClock} from '@astrouxds/react'
const Navbar = () => {
  return (

 <div className='flex justify-center'>
     <RuxGlobalStatusBar className="" app-state="Front-End Challenge" app-name={'Friendship 7'} username={"John Glenn"}  app-domain={"East"} >
     <RuxClock/>
     </RuxGlobalStatusBar>
</div> 
  )
}

export default Navbar